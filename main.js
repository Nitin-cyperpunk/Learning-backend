const express = require('express');

const app = express();
app.use(express.json()); 

var users = [{
    name: "nitin singh",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", function(req, res) {
    const johnKidenys = users[0].kidneys;
    const numberOfKidneys = johnKidenys.length;
    let numberOfHealthyKidneys = 0;
    for ( let i = 0; i<johnKidenys.length; i++) {
        if (johnKidenys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})


app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg: "Kidney added successfully!"
        
    })
});










app.listen(3000);
