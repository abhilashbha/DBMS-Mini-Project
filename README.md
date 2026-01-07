<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Wallet Dashboard</title>
    
    <style>
        :root {
            --primary-blue: #007bff;
            --dark-blue: #0056b3;
            --light-blue: #e0f7fa;
            --dark-text: #333;
            --light-text: #777;
            --border-color: #eee;
            --bg-color: #f8f9fa;
            --sidebar-bg: #2c3e50;
            --sidebar-text: #ecf0f1;
            --sidebar-hover: #34495e;
            --red: #dc3545;
            --green: #28a745;
            --yellow: #ffc107;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            display: flex;
        }

        /* --- NEW: Sidebar Navigation --- */
        .sidebar {
            width: 240px;
            background: var(--sidebar-bg);
            color: var(--sidebar-text);
            position: fixed;
            height: 100%;
            padding-top: 20px;
        }
        .sidebar h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.5em;
        }
        .sidebar nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .sidebar nav a {
            display: block;
            padding: 15px 25px;
            text-decoration: none;
            color: var(--sidebar-text);
            font-weight: 500;
            transition: background 0.2s;
        }
        .sidebar nav a:hover {
            background: var(--sidebar-hover);
        }
        .sidebar nav a.active {
            background: var(--primary-blue);
        }

        /* --- NEW: Main Content Area --- */
        .main-content {
            flex-grow: 1;
            margin-left: 240px; /* Offset for sidebar */
            padding: 30px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            margin-bottom: 30px;
        }
        
        /* Wallet Loader */
        .wallet-loader {
            display: flex;
            gap: 10px;
        }
        .wallet-loader input {
            width: 150px;
        }
        .wallet-loader button {
            margin: 0;
        }

        .welcome-user {
            text-align: right;
        }
        .welcome-user h2 {
            margin: 0;
            font-weight: 600;
        }

        /* Card layout */
        .card {
            background: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            margin-bottom: 20px;
        }
        .card h2 {
            margin-top: 0;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        /* --- NEW: Page Containers --- */
        .page-content {
            display: none; /* All pages are hidden by default */
        }
        .page-content.active {
            display: block; /* The active page is shown */
        }

        /* Dashboard Page */
        #page-dashboard .balance-card {
            background: linear-gradient(135deg, var(--primary-blue), #00a1ff);
            color: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
        }
        #page-dashboard .balance-card p {
            font-size: 1.2em;
            margin: 0;
            opacity: 0.9;
        }
        #page-dashboard .balance-card h1 {
            font-size: 3.5em;
            margin: 10px 0;
        }

        /* Forms */
        form { display: flex; flex-direction: column; }
        input {
            padding: 12px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1em;
        }
        label {
            font-size: 0.9em;
            color: var(--light-text);
            margin-bottom: 5px;
        }
        button {
            padding: 14px;
            background-color: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1.1em;
            font-weight: 500;
            margin-top: 10px;
            transition: background 0.2s;
        }
        button:hover {
            background-color: var(--dark-blue);
        }

        /* Lists (History, Users, Audit) */
        ul { padding-left: 0; }
        li {
            list-style: none;
            background: #fff;
            padding: 15px 20px;
            border-radius: 6px;
            margin-bottom: 10px;
            border: 1px solid var(--border-color);
            font-size: 0.95em;
        }
        .user-li {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user-li .actions { display: flex; gap: 8px; }
        .user-li button {
            padding: 8px 12px;
            font-size: 0.85em;
            margin: 0;
        }
        .edit-btn { background-color: var(--yellow); color: var(--dark-text); }
        .delete-btn { background-color: var(--red); }
        .refresh-btn {
            background-color: var(--green);
            width: 200px;
            margin-bottom: 20px;
        }
        
        /* Status Messages */
        #statusMessage { margin-top: 15px; font-weight: bold; }
        .success { color: var(--green); }
        .error { color: var(--red); }
    </style>
</head>
<body>

    <div class="sidebar">
        <h1>Digital Wallet</h1>
        <nav>
            <ul>
                <li><a href="#" id="nav-dashboard" class="nav-link active">Dashboard</a></li>
                <li><a href="#" id="nav-transfer" class="nav-link">Send Money</a></li>
                <li><a href="#" id="nav-history" class="nav-link">History</a></li>
                <li><a href="#" id="nav-admin" class="nav-link">Admin Panel</a></li>
            </ul>
        </nav>
    </div>

    <div class="main-content">
        
        <div class="header">
            <div class="wallet-loader">
                <input type="number" id="userIdInput" placeholder="Enter Your User ID">
                <button id="loadWalletBtn">Load Wallet</button>
            </div>
            <div class="welcome-user">
                <h2 id="userName">Welcome, ...</h2>
                <span id="userEmail">Please load your wallet</span>
            </div>
        </div>

        <div class="page-container">

            <div id="page-dashboard" class="page-content active">
                <div class="balance-card">
                    <p>Your Current Balance:</p>
                    <h1 id="balance">$0.00</h1>
                </div>
                <div class="card">
                    <h2>Recent History</h2>
                    <ul id="dashboardHistoryList"></ul>
                </div>
            </div>

            <div id="page-transfer" class="page-content">
                <div class="card">
                    <h2>Send Money</h2>
                    <form id="transferForm">
                        <input type="hidden" id="senderId">
                        
                        <label for="receiverId">Receiver's Wallet ID</label>
                        <input type="number" id="receiverId" placeholder="e.g., 9" required>
                        
                        <label for="amount">Amount</label>
                        <input type="number" id="amount" placeholder="e.g., 50.00" step="0.01" required>

                        <button type="submit">Send Money</button>
                    </form>
                    <p id="statusMessage"></p>
                </div>
            </div>

            <div id="page-history" class="page-content">
                <div class="card">
                    <h2>Full Transaction History (from VIEW)</h2>
                    <button id="refreshHistoryBtn" class="refresh-btn">Refresh History</button>
                    <ul id="transactionHistoryList"></ul>
                </div>
            </div>

            <div id="page-admin" class="page-content">
                <div class="card">
                    <h2>User Management (CRUD)</h2>
                    <form id="createUserForm">
                        <input type="text" id="fullName" placeholder="Full Name" required>
                        <input type="email" id="email" placeholder="Email" required>
                        <input type="text" id="phone" placeholder="Phone Number" required>
                        <button type="submit">Create New User</button>
                    </form>
                    <p id="userStatus"></p>
                    <hr style="margin: 25px 0;">
                    <h3>Existing Users (RUD)</h3>
                    <ul id="userList"></ul>
                </div>
                
                <div class="card">
                    <h2>Audit Log (from TRIGGER)</h2>
                    <button id="refreshLogsBtn" class="refresh-btn">Refresh Logs</button>
                    <ul id="auditLogList"></ul>
                </div>
            </div>

        </div> </div> <script>
        const API_URL = 'http://localhost:3000';
        let currentLoadedWalletId = null; // Store the loaded wallet ID
        let currentLoadedUserId = null; // Store the loaded user ID

        // --- NEW: Page Navigation ---
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page-content');

        function showPage(pageId) {
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Remove 'active' from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Show the target page
            document.getElementById(pageId).classList.add('active');
            // Highlight the target nav link
            document.getElementById(`nav-${pageId.split('-')[1]}`).classList.add('active');
        }

        // --- Helper for showing messages ---
        function showStatus(elementId, message, isError = false) {
            const el = document.getElementById(elementId);
            el.textContent = message;
            el.className = isError ? 'error' : 'success';
        }

        // --- 1. WALLET & TRANSFER FUNCTIONS ---
        
        // MODIFIED: fetchWalletBalance now updates the header and dashboard
        async function fetchWalletBalance(userId) {
            try {
                const response = await fetch(`${API_URL}/wallets/${userId}`);
                if (!response.ok) throw new Error('User not found');
                
                const data = await response.json();
                
                // Store globally
                currentLoadedUserId = userId;
                currentLoadedWalletId = data.wallet_id;

                // Update Header
                document.getElementById('userName').textContent = data.full_name;
                
                // Find the user's email from the user list (since /wallets/:userId doesn't return it)
                const userResponse = await fetch(`${API_URL}/users`);
                const users = await userResponse.json();
                const currentUser = users.find(u => u.user_id == userId);
                if (currentUser) {
                    document.getElementById('userEmail').textContent = currentUser.email;
                }

                // Update Dashboard Page
                document.getElementById('balance').textContent = `$${parseFloat(data.balance).toFixed(2)}`;
                
                // Update hidden senderId in Transfer Page
                document.getElementById('senderId').value = data.wallet_id;
                
                showStatus('statusMessage', `Wallet for ${data.full_name} loaded.`, false);
                
                // Refresh dashboard history and switch to dashboard
                fetchTransactionHistory(true); // true = for dashboard
                showPage('page-dashboard');

            } catch (error) {
                document.getElementById('userName').textContent = 'Error';
                document.getElementById('balance').textContent = '$0.00';
                showStatus('statusMessage', `Error: ${error.message}`, true);
            }
        }

        async function handleTransfer(event) {
            event.preventDefault();
            const senderWalletId = document.getElementById('senderId').value;
            const receiverWalletId = document.getElementById('receiverId').value;
            const amount = document.getElementById('amount').value;

            if (!senderWalletId) {
                showStatus('statusMessage', 'Error: Please load your wallet first.', true);
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/transactions/transfer`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        senderWalletId: parseInt(senderWalletId),
                        receiverWalletId: parseInt(receiverWalletId),
                        amount: parseFloat(amount)
                    }),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);

                showStatus('statusMessage', result.message);
                document.getElementById('transferForm').reset();
                
                // Refresh all data
                if(currentLoadedUserId) fetchWalletBalance(currentLoadedUserId);
                fetchTransactionHistory();
                fetchTransactionHistory(true); // for dashboard
                fetchAuditLog();
                
                // Switch to history page to see the result
                showPage('page-history');
                
            } catch (error) {
                showStatus('statusMessage', `Error: ${error.message}`, true);
            }
        }

        // --- 2. CRUD FUNCTIONS FOR USERS ---
        async function fetchUsers() {
            const userListEl = document.getElementById('userList');
            userListEl.innerHTML = '<li>Loading...</li>';
            try {
                const response = await fetch(`${API_URL}/users`);
                const users = await response.json();
                userListEl.innerHTML = '';
                users.forEach(user => {
                    userListEl.innerHTML += `
                        <li class="user-li">
                            <span>
                                <b>${user.full_name}</b> (User ID: ${user.user_id})<br>
                                <b style="color: var(--primary-blue);">Wallet ID: ${user.wallet_id}</b><br> 
                                ${user.email}
                            </span>
                            <div class="actions">
                                <button class="edit-btn" onclick="handleEditUser(${user.user_id}, '${user.full_name}')">Edit</button>
                                <button class="delete-btn" onclick="handleDeleteUser(${user.user_id})">Delete</button>
                            </div>
                        </li>
                    `;
                });
            } catch (error) {
                userListEl.innerHTML = '<li>Error loading users.</li>';
            }
        }

        async function handleCreateUser(event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            try {
                const response = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, phone, password: '123' })
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                
                showStatus('userStatus', result.message);
                document.getElementById('createUserForm').reset();
                fetchUsers(); // Refresh the user list
            } catch (error) {
                showStatus('userStatus', `Error: ${error.message}`, true);
            }
        }

        async function handleEditUser(userId, currentName) {
            const newName = prompt("Enter new full name:", currentName);
            if (!newName || newName === currentName) return;
            try {
                await fetch(`${API_URL}/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName: newName })
                });
                fetchUsers(); // Refresh the user list
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
        
        async function handleDeleteUser(userId) {
            if (!confirm(`Are you sure you want to delete user ${userId}? This is permanent.`)) return;
            try {
                await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
                fetchUsers(); // Refresh the user list
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }

        // --- 3. FUNCTION FOR SQL VIEW ---
        // MODIFIED: Can now update dashboard list or full history list
        async function fetchTransactionHistory(forDashboard = false) {
            const listEl_ID = forDashboard ? 'dashboardHistoryList' : 'transactionHistoryList';
            const listEl = document.getElementById(listEl_ID);
            listEl.innerHTML = '<li>Loading history...</li>';
            
            try {
                const response = await fetch(`${API_URL}/transactions`);
                const transactions = await response.json();
                listEl.innerHTML = '';
                
                // Show only 5 for dashboard
                const itemsToShow = forDashboard ? transactions.slice(0, 5) : transactions;
                
                if (itemsToShow.length === 0) {
                     listEl.innerHTML = '<li>No transactions found.</li>';
                     return;
                }

                itemsToShow.forEach(t => {
                    let text = `<b>$${t.amount}</b> to <b>${t.receiver_name}</b>`;
                    if (t.sender_name) {
                        text = `<b>$${t.amount}</b> from <b>${t.sender_name}</b> to <b>${t.receiver_name}</b>`;
                    }
                    
                    // Highlight if current user was involved
                    let style = '';
                    if (currentLoadedWalletId && (t.sender_wallet_id == currentLoadedWalletId || t.receiver_wallet_id == currentLoadedWalletId)) {
                         style = `border-left: 4px solid ${t.sender_wallet_id == currentLoadedWalletId ? 'var(--red)' : 'var(--green)'};`;
                    }

                    listEl.innerHTML += `
                        <li style="${style}">
                            ${text}
                            <br><small style="color: var(--light-text);">${new Date(t.transaction_date).toLocaleString()}</small>
                        </li>
                    `;
                });
            } catch (error) {
                listEl.innerHTML = '<li>Error loading history.</li>';
            }
        }

        // --- 4. FUNCTION FOR SQL TRIGGER ---
        async function fetchAuditLog() {
            const listEl = document.getElementById('auditLogList');
            listEl.innerHTML = '<li>Loading logs...</li>';
            try {
                const response = await fetch(`${API_URL}/auditlog`);
                const logs = await response.json();
                listEl.innerHTML = '';
                
                if (logs.length === 0) {
                     listEl.innerHTML = '<li>No audit logs found.</li>';
                     return;
                }
                
                logs.forEach(log => {
                    listEl.innerHTML += `
                        <li>
                            ${log.action_description}
                            <br><small style="color: var(--light-text);">${new Date(log.log_timestamp).toLocaleString()}</small>
                        </li>
                    `;
                });
            } catch (error) {
                listEl.innerHTML = '<li>Error loading logs.</li>';
            }
        }

        // --- INITIALIZE THE APP ---
        document.addEventListener('DOMContentLoaded', () => {
            // Attach Page Navigation listeners
            document.getElementById('nav-dashboard').addEventListener('click', () => showPage('page-dashboard'));
            document.getElementById('nav-transfer').addEventListener('click', () => showPage('page-transfer'));
            document.getElementById('nav-history').addEventListener('click', () => showPage('page-history'));
            document.getElementById('nav-admin').addEventListener('click', () => showPage('page-admin'));
            
            // Attach functional listeners
            document.getElementById('loadWalletBtn').addEventListener('click', () => {
                const userId = document.getElementById('userIdInput').value;
                if (userId) {
                    fetchWalletBalance(userId);
                } else {
                    showStatus('statusMessage', 'Please enter a User ID.', true);
                }
            });
            document.getElementById('transferForm').addEventListener('submit', handleTransfer);
            document.getElementById('createUserForm').addEventListener('submit', handleCreateUser);
            document.getElementById('refreshHistoryBtn').addEventListener('click', () => fetchTransactionHistory(false));
            document.getElementById('refreshLogsBtn').addEventListener('click', fetchAuditLog);
            
            // Initial data fetch
            fetchUsers();
            fetchTransactionHistory(true); // for dashboard
            fetchTransactionHistory(false); // for history page
            fetchAuditLog();
        });
    </script>
</body>
</html>

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
    password: 'your_password', // Remember to change this
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
