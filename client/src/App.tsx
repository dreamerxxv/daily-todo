import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
/*************  ✨ Codeium Command 🌟  *************/
function App() {
  return (
    <>
      <Navbar />
      <TodoForm />
      <TodoList />
    </>
  );
}
/******  77e3792f-1f03-43ad-8d44-ad1c4368cfbe  *******/

export default App;
