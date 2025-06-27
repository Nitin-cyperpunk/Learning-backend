const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ItsNitinSIngh";
const app = express();

app.use(express.json());

const users = [];



app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })
    res.send({
        message: "You have signed up"
    })
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        //user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

app.get("/me", function (req, res) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username;
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == token) {
            foundUser = users[i];
        }
    }
    if (foundUser) {
        res.send({
            username: user.username
            
        })
    } else {
        res.json({
            message: "User not found"
        })
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});