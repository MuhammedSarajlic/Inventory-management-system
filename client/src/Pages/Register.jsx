import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../Utils/api";

const initialState = {
  username: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    setError("");
    postData("/api/add-user", userData)
      .then(() => {
        setUserData(initialState);
        navigate("/login");
      })
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <div className="mb-4">
              <p className="text-red-500 text-lg">{error}</p>
            </div>

            <button
              onClick={handleRegister}
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none my-1"
            >
              Create Account
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-600 focus:text-blue-600 transition duration-200 ease-in-out"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
