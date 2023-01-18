import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, NotFound } from "./components";
import { Employee, Home, Login, Register } from "./Pages/index";
import { getData } from "./Utils/api";
import { UserContext } from "./Helper/Context";

function App() {
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    getData("/", token).then((res) => setUser(res));
  }, [token]);

  return (
    <UserContext.Provider value={{ user }}>
      {pathname !== "/login" && pathname !== "/register" && token && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {user?.role === "admin" && (
          <Route path="/employee" element={<Employee />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
