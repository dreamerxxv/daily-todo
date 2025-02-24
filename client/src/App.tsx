import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// production mode api url
// export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
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
