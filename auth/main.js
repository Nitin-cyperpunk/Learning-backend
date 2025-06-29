const express= require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ItsNitinSIngh";

app.use(express.json());
const users = [];
function logger(req, res, next) {
    console.log(req.method + " request come");
    next();
}
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/signup", logger, function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "You have signed up"
    })

})

app.post("/signin", logger, function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    let foundUser = null;
    for ( let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
    }
    if (!foundUser) {
        res.json({
            msg: " Credentials Incorrect"
        })
        return
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.header("jwt", token);
        res.header("random", Math.random());
        res.json({
            token: token
        })
    }

})

function auth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.username) {
        req.username = decodedData.username;
        next()

    }else {
        res.json({
            mesg: "you are not logged in"
        })
    }

}
    
app.get("/me", logger, auth, function(req, res){
    
    
    let foundUser = null;
    for ( let i = 0; i < users.length; i++) {
        if (users[i].username === req.username){
            foundUser = users[i];
        }
    }
    res.json({
        username: foundUser.username,
        password: foundUser.password   
    }) 
    })

app.listen(3000);