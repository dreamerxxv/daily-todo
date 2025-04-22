import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import AllTodos from "./pages/AllTodos";

// production mode api url
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// export const BASE_URL = "http://localhost:5000/api";
// export const BASE_URL = "/api";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/alltodos" element={<AllTodos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
