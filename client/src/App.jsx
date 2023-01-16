import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Employee, Home, Login, Register } from "./Pages/index";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
