import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getData, updateData } from "../Utils/api";
import { UserContext } from "../Helper/Context";
import useToggle from "../Hooks/useToggle";

const Home = ({ setUser }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isOpen, toggle] = useToggle();
  const [error, setError] = useState("");
  const [changePaswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const changePassword = (e) => {
    e.preventDefault();
    setError("");
    updateData("/api/change-user", {
      ...changePaswordData,
      _id: user._id,
    }).then((res) => {
      console.log(res);
      setError(res.response?.data?.error);
      if (res.response?.status !== 400) return toggle();
    });
  };

  const handleChange = (e) => {
    setChangePasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    getData("/", token).then((res) => {
      if (res.response?.status === 401) {
        navigate("/login");
      } else {
        setUser(res);
      }
    });
  }, [navigate, setUser]);

  return (
    <div className="absolute top-0 w-full h-screen flex items-center justify-center">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="w-full max-w-sm m-4 bg-white rounded-lg shadow-xl">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl leading-7 font-semibold text-gray-900">
                  Add Post
                </h2>
                <div
                  onClick={toggle}
                  className=" flex items-center justify-center w-8 h-8 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                  <ion-icon name="close-outline" size="large"></ion-icon>
                </div>
              </div>
              <form onSubmit={changePassword} className="space-y-6 mt-4">
                <div className="space-y-4">
                  <input
                    type="password"
                    required
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={handleChange}
                    className="w-full p-2 border-[1px] border-gray-400 outline-none rounded"
                  />
                  <input
                    type="password"
                    required
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="w-full p-2 border-[1px] border-gray-400 outline-none rounded"
                  />
                  <input
                    type="password"
                    required
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    onChange={handleChange}
                    className="w-full p-2 border-[1px] border-gray-400 outline-none rounded"
                  />
                </div>
                <div>
                  <p className="text-lg text-red-600">{error}</p>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded py-2 px-4"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {user?.role === "employee" ? (
        <div className="w-80 rounded-xl shadow-xl py-10 mt-20">
          <div className="bg-white w-28 h-28 rounded-full mx-auto mt-10">
            <img
              src={
                "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png-400x400.png"
              }
              alt="Profile"
              className="w-full h-full "
            />
          </div>
          <div className="mt-6 px-4 space-y-2">
            <p>
              First Name:{" "}
              <span className="font-bold">{user?.employee_id?.firstName}</span>
            </p>
            <p>
              Last Name:{" "}
              <span className="font-bold">{user?.employee_id?.lastName}</span>
            </p>
            <p>
              Telephone:{" "}
              <span className="font-bold">{user?.employee_id?.telephone}</span>
            </p>
            <p>
              Address{" "}
              <span className="font-bold">{user?.employee_id?.address}</span>
            </p>
            <p>
              Email:{" "}
              <span className="font-bold">{user?.employee_id?.email}</span>
            </p>
            <p>
              Date of employment:{" "}
              <span className="font-bold">
                {user?.employee_id?.dateOfEmployment?.slice(0, 10)}
              </span>
            </p>
            <div className="flex justify-center pt-10">
              <button
                onClick={toggle}
                className="bg-blue-600 text-white rounded py-2 px-4"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Welcome to Inventory Management System App</p>
        </div>
      )}
    </div>
  );
};

export default Home;
