
import './App.css'
import { useEffect,useState } from 'react';
function App() {

  const [title,setTitle ]  =useState("")
const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(true)
  useEffect (()=>{
async function fetchTodos(){
  setLoading(true)
  const response = await fetch("http://localhost:3000/api/tasks")
  const data = await response.json();
  setTodos(data)
  setLoading(false)
}
fetchTodos()
  },[])



async function handleAddToDo() {
  if (title.trim() === "") {
    return
  }

  const response = await fetch("http://localhost:3000/api/tasks", {
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

  const response = await  fetch(`http://localhost:3000/api/tasks/${id}`,{
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
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`,{
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
          <h1>Todo App</h1>
          <p className="subtitle">Add tasks, track progress, and keep your day clear.</p>
        </header>

        <div className="todo-form">
          <input
          value={title}
        onChange={(event)=> setTitle(event.target.value)}
            className="todo-input"
            type="text"
            placeholder="Write a new task..."
          />
          <button  onClick={handleAddToDo} className="add-button" type="button">
            Add
          </button>
        </div>

        <div className="todo-summary">
          <span>Total: {todos.length}</span>
          <span>Completed: {completedCount}</span>
        </div>
{loading && <p>Loading todos...</p>}
        <ul className="todo-list">
          {todos.map((todo) => (
   <li
  className={todo.completed ? "todo-item completed" : "todo-item"}
  key={todo.id}
>
              <label className="todo-check">
                <input type="checkbox" checked={todo.completed} 
                onChange={() => handleToggleTodo(todo.id)}
                />
                <span>{todo.title}</span>
              </label>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-button"
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
