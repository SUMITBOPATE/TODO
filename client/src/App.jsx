
import { useEffect,useState } from 'react';
import {
  DrawablyAlert,
  DrawablyButton,
  DrawablyCheckbox,
  DrawablyInput,
  DrawablyUnderline,
} from 'drawably/react'
import 'drawably/style.css'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const TASKS_URL = `${API_URL}/api/tasks`

function App() {

  const [title,setTitle ]  =useState("")
const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")


  useEffect (()=>{
async function fetchTodos(){
  setLoading(true)
  setError("")
     try {
   const response = await fetch(TASKS_URL)
  if (! response.ok){
    throw new Error   (`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  setTodos(data)
     }
     catch (error){
      console.error("Could not load tasks:", error)
      setError("Could not load tasks. Please try again.")
     }
     finally {
      setLoading(false)
     }
}
fetchTodos()
  },[])



async function handleAddToDo() {
  if (title.trim() === "") {
    return
  }

  const response = await fetch(TASKS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      completed: false,
    }),
  });

  const newTodo = await response.json()

  setTodos([...todos, newTodo])
  setTitle("")
}

// function handleAddToDo() {
//   if (title.trim() === "") {
//     return
//   }
//   const newTodo = {
//     id: Date.now(),
//     title: title,
//     completed: false
//   }
//   setTodos([...todos, newTodo])
//   setTitle("")
// }


// Click checkbox → handleToggleTodo(id)
//  map through todos
// find matching todo
// return copied todo with completed flipped
// setTodos
//  React re-renders




async function handleToggleTodo(id) {
   const todoToUpdate = todos.find((todo) => todo.id === id)
   const updateCompleted= !todoToUpdate.completed

  const response = await  fetch(`${TASKS_URL}/${id}`,{
  method: "PATCH",
    headers:{
      "Content-Type": "application/json", 
    },
  body: JSON .stringify ({
    completed: updateCompleted,
  }),
  })

  const updatedTodo =await response.json()

  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return updatedTodo;
       
      
    }
  
    return todo;
  })

  setTodos(updatedTodos)
}

async function handleDeleteTodo(id) {
  const response = await fetch(`${TASKS_URL}/${id}`,{
    method : "DELETE",
  })

  if (!response.ok) {
    console.error("Could not delete task", await response.text())
    return
  }

  const updatedTodos = todos.filter((todo) => todo.id !== id)

  setTodos(updatedTodos)
}

const completedCount = todos.filter((todo) => todo.completed).length

   
  return (
    <main className="app-shell">
      <section className="todo-panel">
        <header className="todo-header">
          <p className="eyebrow">Full-stack Todo</p>
          <h1><DrawablyUnderline boil={0.12}>Todo App</DrawablyUnderline></h1>
          <p className="subtitle">Add tasks, track progress, and keep your day clear.</p>
        </header>

        <div className="todo-form">
          <DrawablyInput
            value={title}
            onChange={(event)=> setTitle(event.target.value)}
            className="todo-input"
            type="text"
            placeholder="Write a new task..."
          />
          <DrawablyButton onClick={handleAddToDo} className="add-button" variant="solid" boil={0.12}>
            Add
          </DrawablyButton>
        </div>

        <div className="todo-summary">
          <span>Total: {todos.length}</span>
          <span>Completed: {completedCount}</span>
        </div>
 {loading && <p className="status-message" role="status">Loading todos...</p>}
 {error && <DrawablyAlert className="status-message error-message" role="alert">{error}</DrawablyAlert>}
 { !loading && !error && todos.length === 0 && (
   <p className="empty-state">No tasks yet. Add your first task above.</p>
 )}
        <ul className="todo-list">
          {todos.map((todo) => (
   <li
  className={todo.completed ? "todo-item completed" : "todo-item"}
  key={todo.id}
>
              <label className="todo-check">
                <DrawablyCheckbox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  boil={0.12}
                />
                <span>{todo.title}</span>
              </label>
              <DrawablyButton
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-button"
                tone="danger"
                boil={0.12}
              >
                Delete
              </DrawablyButton>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
