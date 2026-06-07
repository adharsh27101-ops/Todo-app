import Todo from "./components/CRUD"
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crud" element={<Todo />}/>
      <Route path="/signin" element={<Login />} />
    </Routes>
  )
}

export default App