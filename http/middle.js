const express = require('express');
const app = express();

function loggerMiddleware(req, res, next) {
    console.log("method is " + req.method);
    console.log("Host is " + req.hostname);
    console.log("Route is " + req.url);
    console.log(new Date());
    next;
}
app.use(loggerMiddleware);
app.get("/sum/:a/:b", function(req, res)  {
 const a = parseInt(req.params.a);
 const b = parseInt(req.params.b);
 res.json({
    answer: a + b
 })
})
app.get("/multi/:a/:b", function(req, res)  {
 const a = parseInt(req.params.a);
 const b = parseInt(req.params.b);
 res.json({
    answer: a * b
 })

})
app.listen(3000) 