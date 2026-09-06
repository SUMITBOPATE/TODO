## React State / Todo Data Shape

### Question
What does `Date.now()` give us here, and why are we using it for `id` temporarily?

### Short answer
`Date.now()` returns the current timestamp in milliseconds. We use it temporarily to create a mostly unique frontend `id` until the backend provides real ids.

### Why it matters
React needs stable ids when rendering lists and when updating or deleting a specific todo.

### Related file/function
`client/src/App.jsx` / `handleAddToDo`

## React State

### Question
Why do we use `.map()` to update one item in an array instead of directly changing `todo.completed`?

### Short answer
We use `.map()` to create a new array with one updated todo object, instead of mutating the existing state directly.

### Why it matters
React state updates should be immutable so React can detect what changed and re-render the UI correctly.

### Related file/function
`client/src/App.jsx` / `handleToggleTodo`

## React State / Object Updates

### Question
What does the spread operator `...todo` do in this update?

### Short answer
`...todo` copies the existing todo object's properties into a new object.

### Why it matters
It lets us keep properties like `id` and `title` while changing only `completed`, without mutating the original todo object.

### Related file/function
`client/src/App.jsx` / `handleToggleTodo`

## JSX Basics

### Question
What is JSX, and why does React use `className` instead of `class`?

### Short answer
JSX is JavaScript syntax that lets us describe UI using HTML-like markup. React uses `className` because `class` is a reserved word in JavaScript.

### Why it matters
Most React components are written with JSX, so understanding JSX helps you read and write UI structure clearly.

### Related file/function
`client/src/App.jsx` / `App`

## Forms / Controlled Inputs

### Question
Why do we store form input text in React state instead of reading directly from the DOM?

### Short answer
We store input text in state so React knows the current value and can use it for validation, submitting, clearing the input, and rendering related UI.

### Why it matters
In this Todo app, React needs the typed title before it can create a todo or send it to the backend.

### Related file/function
`client/src/App.jsx` / `todo-input`

## Forms / Controlled Inputs

### Question
What happens if you use `value={title}` but forget to add `onChange`?

### Short answer
The input becomes read-only because React controls the value but no event handler updates the state when the user types.

### Why it matters
A controlled input needs both `value` and `onChange`: one displays state, the other updates state.

### Related file/function
`client/src/App.jsx` / `todo-input`

## JavaScript Basics

### Question
What is the difference between `=` and `===` in JavaScript?

### Short answer
`=` assigns a value. `===` compares two values for strict equality without type conversion.

### Why it matters
In `handleAddToDo`, using `title = ""` changes the value, while `title === ""` checks whether it is empty.

### Related file/function
`client/src/App.jsx` / `handleAddToDo`

## Event Handling

### Question
Why do we create an event handler function for the Add button?

### Short answer
An event handler gives React a clear function to run when the user clicks the button.

### Why it matters
The Add button should trigger the todo flow: read input state, create a todo, update state, and eventually call the backend.

### Related file/function
`client/src/App.jsx` / `handleAddToDo`

## React State

### Question
Why do we use `setTodos([...todos, newTodo])` instead of `todos.push(newTodo)`?

### Short answer
`setTodos([...todos, newTodo])` creates a new array, while `push` mutates the existing array.

### Why it matters
React state should be updated immutably so React can detect the change and re-render the UI correctly.

### Related file/function
`client/src/App.jsx` / `handleAddToDo`

## React State / Todo Data Shape

### Question
Why should each todo be an object instead of just a string?

### Short answer
A todo object can store multiple pieces of data, such as `id`, `title`, and `completed`.

### Why it matters
The app needs more than text so it can render, complete, update, and delete the correct todo.

### Related file/function
`client/src/App.jsx` / `handleAddToDo`
