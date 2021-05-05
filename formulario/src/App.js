import React, {Fragment, useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from 'uuid';
import TodoList from './components/TodoList';
//import logo from './logo.svg';
import './App.css';

const KEY = 'todoApp.todos';

function App() {

  const [todos, setTodos] = useState([
    { id: 1, reference: '00035189', lote: '54945', completed: false},
  ])
  
  const todoTaskRef = useRef();
  const todoLoteRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
      setTodos(storedTodos);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !(todo.completed);
    setTodos(newTodos); // lo volvoemos a enviar con el estado cambiado
  }

  const handleTodoAdd = () => {
    const reference = todoTaskRef.current.value;
    const lote = todoLoteRef.current.value;
    if(reference ==="" && lote === "")return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), reference, lote, completed: false}]
    })

    todoTaskRef.current.value = null ;
    todoLoteRef.current.value = null ;
  }

  const handlerClearAll = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <br></br>
      Referencia: <input ref={todoTaskRef} type='text' placeholder="# Referencia"/>
      <br></br>
         Lote: <input ref={todoLoteRef} type='text' placeholder="# Lote"/>
      <br></br>
      <button type='submit' onClick={handleTodoAdd} >Agregar</button>
      <button type='submit'onClick={handlerClearAll}>Eliminar</button>
     
    </Fragment>
  );
}

export default App;
