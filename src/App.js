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

function TodoSubmitArea({onAdd}){

  return (
    <div>
      <input type = "text"></input>
      <button>Add</button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  
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
    let new_tasks = tasks.slice() 
    let task_handled = new_tasks[new_tasks.findIndex( task => task.id === id)];
    task_handled.done = !task_handled.done;
    setTasks(new_tasks);
  }

  const taskElements = tasks.map((task) => {
    return (
      <TodoContainer key = {task.id} task = {task} onDone = {() => handleDone(task.id)}></TodoContainer>
    )
  });
  return (
    <div className='App'>
      <TodoSubmitArea></TodoSubmitArea>
      {taskElements}
    </div>
  );
}

export default App;
