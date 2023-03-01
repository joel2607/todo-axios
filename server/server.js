const express = require("express"); 
const cors = require('cors');

const app = express() 

app.use(cors());
app.use(express.json());

const tasks = [
    {
        id: 1,
        name: "Server Task 1",
        done: false
    },
    {
        id: 2,
        name: "Server Task 2",
        done: true
    }
];

app.get("/", (req, res) => {
    res.send(tasks);
});

app.put("/", (req, res) => {
    tasks.push(req.body);
    res.send(tasks);
})

// app.post()

app.listen(9000, ()=>{
    console.log('server running at 9000')
})