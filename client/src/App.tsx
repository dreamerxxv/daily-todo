import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
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
