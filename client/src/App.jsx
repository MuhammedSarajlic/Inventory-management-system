import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, NotFound } from "./components";
import { Employee, Home, Login, Register } from "./Pages/index";
import { getData } from "./Utils/api";

function App() {
  const [user, setUser] = useState();
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    getData("/", token).then((res) => setUser(res));
  }, [token]);

  return (
    <div className="relative">
      {token && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        {user?.role === "admin" && (
          <Route path="/employee" element={<Employee />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
