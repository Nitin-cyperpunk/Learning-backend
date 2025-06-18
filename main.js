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
})

app.put("/", function(req, res) {
    for ( let i = 0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})


app.delete("/", function(req, res) {
    const newKidneys = [];
    for ( let i = 0; i<users[0].kidneys.length; i++) {
        if ( users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({msg: "Unhealthy kidneys deleted successfully!"});
})






app.listen(3000);
