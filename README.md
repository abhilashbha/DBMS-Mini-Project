# Digital Wallet Management System (DBMS Mini Project)

## Project Description
The Digital Wallet Management System is a DBMS mini project developed to manage digital wallet transactions between users. The system allows users to create accounts, maintain wallet balances, transfer money, view transaction history, and track all transactions using an audit log.

This project demonstrates core Database Management System concepts such as tables, relationships, SQL views, triggers, and transactions along with a simple web-based user interface.

---

## Database Concepts Used
- Tables
- Primary Key
- Foreign Key
- SQL Views
- SQL Triggers
- Transactions
- Joins
- CRUD Operations (Create, Read, Update, Delete)
- Audit Logging

---

## Technologies Used
- MySQL (Database)
- Node.js (Backend)
- Express.js (API)
- HTML, CSS, JavaScript (Frontend)
- REST API

---

## Database Tables
| Table Name | Description |
|------------|-------------|
| users | Stores user information |
| wallets | Stores wallet balance |
| transactions | Stores money transfer details |
| auditlog | Stores transaction logs (Trigger) |
| v_transactiondetails | View for transaction details |

---

## Features
- Create User
- Update User
- Delete User
- Wallet Balance Management
- Send Money Between Wallets
- Transaction History
- Audit Log using Trigger
- Admin Panel for User Management
- Dashboard for Wallet Balance

---

## How to Run the Project

### Step 1: Setup Database
1. Open MySQL
2. Create database
3. Import SQL files:
   - schema.sql
   - triggers.sql
   - view.sql
   - sample_data.sql

### Step 2: Run Backend
```bash
node server.js
