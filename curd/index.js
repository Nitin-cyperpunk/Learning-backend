const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express()

const PORT = 8000


app.get("/api/users",(req, res) => {
   return res.json(users)
})

app.get('/users', (req, res) => {
   const html = `
   <ul>
      ${users.map((user) => `<li>${user.first_name} - ${user.city}</li>`).join("")} -
      
   </ul>`
   return res.send(html)
})



// app.get("/api/users/:id", (req, res) => {
//    const id = Number(req.params.id)
//    const user = users.find((user) => user.id === id)
//    return res.json(user)
// })
   

app.route('/api/users/:id')
   .get((req, res) => {
      const id = Number(req.params.id)
      const user = users.find((user) => user.id === id)
      return res.json(user)
   }).patch((req, res) => {
      const id = Number(req.params.id)
      let user = users.find((user) => user.id === id)
      user = { ...user, ...req.body }
      return res.json(user)
   }  ).delete((req, res) => {
      const id = Number(req.params.id)
      const filteredUsers = users.filter((user) => user.id !== id)
      return res.json(filteredUsers)
   })

app.post("/api/users",(req, res) => {  
   const body = req.body
   console.log("Body", body);
   
      return res.json({message: "User created successfully"})
   }  )
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`))