const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const USERS = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/signup', function(req, res) {
    const { email, password } = req.body;
    const userExists = USERS.some(user => user.email === email);

    if (userExists) {
        res.status(400).json({ error: 'User with email already exists' });
    } else {
        USERS.push({ email, password });
    }

    res.status(200).json({ message: 'User signed up successfully' });
});

app.post('/login', function(req, res) {
    const { email, password } = req.body;
    const user = USERS.find(user => user.email === email);

    if (user) {
        if (user.password === password) {
            const token = generateRandomToken();
            res.status(200).json({ token: token, message: "Login successful" });
        } else {
            res.status(401).json({ message: "Password incorrect" });
        }
    } else {
        res.status(401).json({ error: 'User does not exist' });
    }
});

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`);
});

function generateRandomToken() {
    // Generate a random token logic goes here
    // Return the generated token
}

