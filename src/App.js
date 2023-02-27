import './App.css';

function TodoContainer({name, onDone}){
  return (
    <div>
      <label>{name}</label>
      <input type = "checkbox" onClick={onDone()}></input>
    </div>
  );
}

function TodoSubmitArea(){
  return (
    <div>
      <input type = "text">
        
      </input>
      <button>Submit</button>
    </div>
  );
}

function App() {
  function onDone(i){
    console.log("done" + i);
  }
  return (
    <>
      <TodoContainer name = "Task 1" onDone = {() => onDone(1)}></TodoContainer>
      <TodoSubmitArea></TodoSubmitArea>
    </>
  );
}

export default App;
