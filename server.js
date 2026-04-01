// Import necessary packages
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// --- Database Connection ---
const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'abhilash', // Remember to change this
    database: 'student'
});

// --- API Endpoints ---

// == CRUD OPERATIONS FOR USERS ==

// CREATE User (and their wallet)
app.post('/users', async (req, res) => {
    const { fullName, email, password, phone } = req.body;
    let connection;
    try {
        connection = await dbPool.getConnection();
        await connection.beginTransaction();

        // 1. Create User
        const [userResult] = await connection.execute(
            'INSERT INTO Users (full_name, email, password_hash, phone_number) VALUES (?, ?, ?, ?)',
            [fullName, email, 'hashed_password', phone] // Using a placeholder for hash
        );
        const newUserId = userResult.insertId;

        // 2. Create Wallet for that User
        await connection.execute(
            'INSERT INTO Wallets (user_id, balance) VALUES (?, 0.00)',
            [newUserId]
        );

        await connection.commit();
        res.status(201).json({ message: 'User and wallet created!', userId: newUserId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Database error' });
    } finally {
        if (connection) connection.release();
    }
});

// READ All Users (MODIFIED to include wallet_id)
app.get('/users', async (req, res) => {
    try {
        // MODIFIED QUERY: Join with Wallets to get wallet_id
        const [rows] = await dbPool.execute(
            `SELECT u.user_id, u.full_name, u.email, u.phone_number, w.wallet_id 
             FROM Users u
             JOIN Wallets w ON u.user_id = w.user_id`
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

// UPDATE User (e.g., update their name)
app.put('/users/:userId', async (req, res) => {
    try {
        const { fullName } = req.body;
        const { userId } = req.params;
        await dbPool.execute(
            'UPDATE Users SET full_name = ? WHERE user_id = ?',
            [fullName, userId]
        );
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

// DELETE User
app.delete('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Because of 'ON DELETE CASCADE', deleting the user
        // will automatically delete their wallet and transactions.
        await dbPool.execute('DELETE FROM Users WHERE user_id = ?', [userId]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

// == WALLET & TRANSACTION ENDPOINTS ==
// GET Wallet Balance
app.get('/wallets/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await dbPool.execute(
            `SELECT u.full_name, w.balance, w.wallet_id
             FROM Users u
             JOIN Wallets w ON u.user_id = w.user_id
             WHERE u.user_id = ?`,
            [userId]
        );
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: 'User or wallet not found' });
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
});

// POST Transaction
// POST Transaction (UPDATED to use a Stored Procedure)
app.post('/transactions/transfer', async (req, res) => {
    const { senderWalletId, receiverWalletId, amount } = req.body;
    
    try {
        // 1. Call the stored procedure.
        // '@out_message' is a MySQL session variable to capture the output.
        await dbPool.execute(
            'CALL sp_TransferFunds(?, ?, ?, @out_message)',
            [senderWalletId, receiverWalletId, amount]
        );

        // 2. Retrieve the output message from the session variable
        const [resultRows] = await dbPool.execute('SELECT @out_message AS message');
        const message = resultRows[0].message;

        // 3. Send the message back to the frontend
        if (message === 'Transfer successful!') {
            res.status(200).json({ message: message });
        } else {
            // Use a specific error code if the wallet wasn't found
            if (message.includes('not found') || message.includes('does not exist')) {
                res.status(404).json({ message: message });
            } else {
                // Use 400 for other user errors like "Insufficient funds"
                res.status(400).json({ message: message });
            }
        }

    } catch (error) {
        // This catches errors in Node.js or in the connection itself
        console.error('Error calling stored procedure:', error);
        res.status(500).json({ message: 'A critical server error occurred.' });
    }
    // Notice: No connection.release() is needed, the pool handles it.
});
// --- ENDPOINT FOR SQL VIEW ---
app.get('/transactions', async (req, res) => {
    try {
        const [rows] = await dbPool.execute('SELECT * FROM v_TransactionDetails LIMIT 10');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching from view:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

// --- ENDPOINT FOR TRIGGER'S AUDIT LOG ---
app.get('/auditlog', async (req, res) => {
    try {
        const [rows] = await dbPool.execute('SELECT * FROM AuditLog ORDER BY log_timestamp DESC LIMIT 10');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching audit log:', error);
        res.status(500).json({ message: 'Database error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});