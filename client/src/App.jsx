import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, NotFound } from "./components";
import { Employee, Home, Login, Register, Supplier } from "./Pages/index";
import { UserContext } from "./Helper/Context";
import { getData } from "./Utils/api";

function App() {
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    getData("/", token).then((res) => setUser(res));
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token }}>
      {pathname !== "/login" && pathname !== "/register" && token && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {user?.role === "admin" && (
          <Route path="/employee" element={<Employee />} />
        )}
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
