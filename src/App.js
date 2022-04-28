import React, { useState } from 'react';
import {ReactComponent as XIcon} from './x-icon.svg';

function Todo ({ todo, index, completeTodo, removeTodo }){
  return (
  <div 
    onClick={ () => completeTodo(index) } 
    className="flex justify-between items-center rounded bg-white shadow-md p-4 mb-4 border border-transparent hover:border-blue-200 hover:shadow-lg cursor-pointer"
  >
    <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} >{todo.text}</span>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        removeTodo(index);
      }}
      className="rounded p-2 hover:shadow-xl border border-red-200 font-bold text-red-500 hover:bg-red-500 hover:text-white"
    >
      <XIcon></XIcon>
    </button>
  </div>);
} 

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="block w-full rounded bg-white p-4 mb-4 border border-transparent hover:border-blue-200 shadow-xl" 
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type todo and hit Enter" 
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { 
      text: "Learn about React",
      isCompleted: false
    },
    { 
      text: "Meet friend for lunch",
      isCompleted: false 
    },
    { 
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);
  
  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }; 

  return (
    <div>
      <h1 className="mb-4 text-center font-bold text-xl">Simple ToDo</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />))}
      <div className="text-center text-blue-500 hover:text-blue-400"><a href="https://t.me/ilyosjon_k">@ilyosjon_k</a></div>
    </div>
  );
}

export default App;
