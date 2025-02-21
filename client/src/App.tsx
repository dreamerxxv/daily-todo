import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export const BASE_URL = "/api";
function App() {
  return (
    <>
      <div>
        <Navbar />
        <TodoForm />
        <TodoList />
      </div>
    </>
  );
}

export default App;
