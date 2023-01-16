import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../Utils/api";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    getData("/", token).then((res) => {
      if (res.response?.status === 401) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <p>Welcome to Inventory management system</p>
    </div>
  );
};

export default Home;
