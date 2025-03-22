import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { useState, useEffect } from "react"

function App() {

  const [todos, setTodos] = useState([])
  const [selectedTab, setSelectedTab] = useState("Open")

  function handleAddTodo(newTodo) {
    const newTodos = [...todos, {input : newTodo, complete : false}]
    setTodos(newTodos)
    handleSaveData(newTodos)
  }

  function handleCompleteTodo(index) {
    let newTodos = [...todos]
    let completedTodo = newTodos[index]
    completedTodo.complete = true
    newTodos[index] = completedTodo
    setTodos(newTodos)
    handleSaveData(newTodos)
  }

  function handleDeleteTodo(index) {
    const newTodos = todos.filter((todo, todoIndex) => {
      return todoIndex != index
    })
    setTodos(newTodos)
    handleSaveData(newTodos)
  }

  function handleSaveData(currTodos) {
    localStorage.setItem("react-todo-app", JSON.stringify({ todos : currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem("react-todo-app")) { return }
    let db = JSON.parse(localStorage.getItem("react-todo-app"))
    setTodos(db.todos)
  }, [])
  
  return (
    <>
      <Header todos={todos}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
      <TodoList selectedTab={selectedTab} todos={todos} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )

}

export default App
