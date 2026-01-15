const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express()

const PORT = 8000
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.get("/api/users", (req, res) => {
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
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
})

.delete((req, res) => {
  const id = Number(req.params.id);
  const newUsers = users.filter(u => u.id !== id);

  if (newUsers.length === users.length) {
    return res.status(404).json({ error: "User not found" });
  }

  users = newUsers;
  res.json({ message: "User deleted successfully" });
});

app.post("/api/users", (req, res) => { 
   const body = req.body;
    users.push({ ...body, id: users.length + 1 });
     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), "utf-8", (err, data) => { 
      return res.json({ message: "User created successfully" }) }) })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))