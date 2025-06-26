const express = require('express');
const app = express();

let requestCount = 0;

function requestIncrease(req, res, next) {
    requestCount = requestCount + 1;
    console.log("total number of requests = " + requestCount);
    req.requestCount = requestCount;
    res.json({
       msg: "Request received" 
    })
}

function sumHandler(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        answer: a + b
    });
}

app.use(requestedIncrese)
app.get("/sum", sumHandler);


 

app.get("/multi/:a/:b", function(req, res)  {
    requestIncrease(req, res);
 const a = parseInt(req.params.a);
 const b = parseInt(req.params.b);
 res.json({
    answer: a * b
 })

})
app.listen(3000)