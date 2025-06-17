const express = require("express")
const app = express()
 app.get('/', function(req, res){
    res.send('helloe World')
 })

 app.listen(3000)