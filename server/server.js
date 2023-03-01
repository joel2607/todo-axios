const express = require("express"); 
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express() 

app.use(cors());
app.use(express.json());

const tasks = [];

app.get("/", (req, res) => {
    res.send(tasks);
});

app.post("/", (req, res) => {
    const newTask = {
        id: uuidv4(),
        name: req.body.text,
        done: false
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.put("/", (req,res) => {
    const newTask = req.body;
    let existingTaskIndex = tasks.findIndex((taskItem) => taskItem.id == newTask.id);
    if (existingTaskIndex == -1) tasks.push(newTask); // Array.Prototype.findIndex() returns -1 if item is not found
    else tasks[existingTaskIndex] = newTask;
    res.status(201).json(tasks);
});

app.listen(9000, ()=>{
    console.log('server running at 9000')
})
