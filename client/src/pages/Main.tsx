// import React from 'react'

import Navbar from "../components/Navbar"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

const Main = () => {
  return (
    <div>
      <Navbar />
          <TodoForm />
          <TodoList />
    </div>
  )
}

export default Main
