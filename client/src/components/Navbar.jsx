import Cookies from "js-cookie";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Helper/Context";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <>
      <div className="w-full px-2 py-1 shadow-lg">
        <div className="container flex flex-wrap items-center justify-end mx-auto">
          <div className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/employee"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-500"
                  >
                    Employees
                  </Link>
                </li>
              )}
              <li>
                <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-500">
                  Warehouse
                </Link>
              </li>
              <li>
                <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-500">
                  Suppliers
                </Link>
              </li>
              <li>
                <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:text-gray-500">
                  Products
                </Link>
              </li>
              <button
                className="bg-gray-900 rounded text-white px-4 py-1"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
