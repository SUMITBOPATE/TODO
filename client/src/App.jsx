
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



function handleAddToDo() {
  if (title.trim() === "") {
    return
  }
  const newTodo = {
    id: Date.now(),
    title: title,
    completed: false
  }
  setTodos([...todos, newTodo])
  setTitle("")
}


// Click checkbox → handleToggleTodo(id)
//  map through todos
// find matching todo
// return copied todo with completed flipped
// setTodos
//  React re-renders

function handleToggleTodo(id) {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      }
    }

    return todo
  })

  setTodos(updatedTodos)
}

function handleDeleteTodo(id) {
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
