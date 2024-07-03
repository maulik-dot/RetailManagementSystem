const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const path = require("path");

const PORT = 8000;

console.log(__dirname);
const staticpath = path.join(__dirname, "../public");

app.use(express.static(staticpath));

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maulik@2004',
    database: 'PROJECT'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Define body-parser middleware before defining route handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body; // Use 'username' instead of 'email'

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?'; // Change 'email' to 'username'
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // User authenticated, send success response
            res.status(200).send('Login successful!');
        } else {
            // User not found or incorrect password, send error response
            res.status(401).send('Invalid username or password.');
            
        }
    });
});

app.post('/signup', (req, res) => {
    const { name, email, address, contact, password } = req.body;

    // Check if username/email already exists
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    connection.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing checkUserQuery:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // User with the same email already exists, send error response
            console.log('User with this email already exists');
            return res.status(409).send('User with this email already exists.');
        } else {
            // Insert new user into the database
            const addUserQuery = "INSERT INTO user (name, email, address, contact_number, password) VALUES (?, ?, ?, ?, ?)";
            connection.query(addUserQuery, [name, email, address, contact, password], (err, results) => {
                if (err) {
                    console.error('Error executing addUserQuery:', err);
                    return res.status(500).send('Internal Server Error');
                }

                if (results.affectedRows > 0) {
                    // User added successfully, send success response
                    console.log('User added successfully');
                    res.status(200).send(name + ' added successfully!');
                } else {
                    // Insert operation did not affect any rows
                    console.log('User not added');
                    res.status(500).send('Failed to add user.');
                }
            });
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
