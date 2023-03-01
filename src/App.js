import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

const server = Axios.create({
  baseURL: "http://localhost:9000/"
});

function TodoContainer({task, onDone}){
  return (
    <div>
      <label 
        style = {{
          textDecoration: (task.done)?'line-through':'none'
        }}
        onClick = {onDone}>
          {task.name}
      </label>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] =  useState('');
  
  useEffect(() => {
    server.get('/')
    .then((response) => {
      setTasks(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  
  function handleDone(id){
    let _tasks = tasks.slice() 
    let task_handled = _tasks[_tasks.findIndex( task => task.id === id)];
    task_handled.done = !task_handled.done;
    server.put('/', task_handled).catch((err) => console.log(err));
    setTasks(_tasks);
  }

  function createTask(taskName){
    server.post('/', {
      text: taskName
    })
    .then((response) => {
      let this_tasks = tasks.slice();
      this_tasks.push(response.data);
      setTasks(this_tasks);
      setInput("");
      
    })
    .catch((err) => console.log(err));
  }

  const taskElements = tasks.map((task) => {
    return (
      <TodoContainer key = {task.id} task = {task} onDone = {() => handleDone(task.id)}></TodoContainer>
    )
  });
  return (
    <div className='App'>
      <div>
        <input type = "text" onChange={(event) => setInput(event.target.value)} value = {input}></input>
        <button onClick={() => createTask(input)}>Add</button>
      </div>

      {taskElements}
    </div>
  );
}

export default App;
