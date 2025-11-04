// server.js
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433,
};

const SECRET = process.env.JWT_SECRET;



// Register API
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const pool = await sql.connect(config);
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length === 0)
            return res.status(400).json({ error: 'User not found' });

        const user = result.recordset[0];
        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass)
            return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

//run server
app.listen(3000, () => console.log('Server running on port 3000'));
