import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../Utils/api";

const Home = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    getData("/", token).then((res) => {
      if (res.response?.status === 401) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Home;
