// const express1 = require('express');
// const bodyParser = require('body-parser');
// const path=require("path");

// const app = express1();
// const PORT = 8000;

// console.log(__dirname);
// const staticpath= path.join(__dirname,"../public");

// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express1.static(staticpath));

// // GET request handler for /login
// app.get('/login', (req, res) => {
//     res.send('This is the login page.');
// });

// // POST request handler for /login (already defined)
// // app.get('/login', (req, res) => {
// //     const { username, password } = req.body;
// //     console.log(username + ':' + password); // eslint

// //     if (username === 'user' && password === 'password') {
// //         res.status(200).send('Login successful!');
// //     } else {
// //         res.status(401).send('Username or password is incorrect.');
// //     }
// // });

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });
