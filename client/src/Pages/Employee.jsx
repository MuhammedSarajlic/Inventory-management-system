import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AddEmployeeModal } from "../components";
import useToggle from "../Hooks/useToggle";
import { getData, postData, updateData } from "../Utils/api";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  telephone: "",
  address: "",
  email: "",
  dateOfEmployment: "",
  username: "",
  password: "",
  dateOfCancellation: "",
};

const Employee = () => {
  const token = Cookies.get("jwt_token");
  const [isOpen, toggle] = useToggle(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState(initialState);

  const clearInputField = () => {
    setEmployeeData(initialState);
  };

  const handleAddEmployee = () => {
    postData("/api/employee/add", employeeData).then(() => {
      setEmployees(employeeData);
      clearInputField();
    });
  };

  const getEmployees = () => {
    getData("/api/employee/get", token).then((res) => setEmployees(res));
  };

  const updateEmployeeData = (id) => {
    let employee = employees.find((employee) => employee._id === id);
    setEmployeeData({
      ...employee,
      dateOfEmployment: employee?.dateOfEmployment?.slice(0, 10),
      dateOfCancellation: employee?.dateOfCancellation?.slice(0, 10),
    });
  };

  const updateEmployee = () => {
    updateData("/api/employee/update", employeeData);
  };

  useEffect(() => {
    getEmployees();
  }, [employees]);

  return (
    <>
      {isOpen && (
        <AddEmployeeModal
          toggle={toggle}
          setEmployeeData={setEmployeeData}
          handleAddEmployee={handleAddEmployee}
          employeeData={employeeData}
          clearInputField={clearInputField}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateEmployee={updateEmployee}
        />
      )}

      <div className="pt-10 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center my-8">
          <p className="text-3xl font-bold">Employees</p>
          <button
            onClick={toggle}
            className="px-4 py-2 text-sky-600 text-xl rounded"
          >
            + Add Employee
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-6 pr-4 py-3">
                  First Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Telephone
                </th>
                <th scope="col" className="px-4 py-3">
                  Address
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Date of employment
                </th>
                <th scope="col" className="px-4 py-3">
                  Date of cancellation
                </th>
                <th scope="col" className="px-4 py-3">
                  Update
                </th>
              </tr>
            </thead>
            {employees.length > 0 && (
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="pl-6 pr-4 py-4">{employee?.firstName}</td>
                    <td className="p-4">{employee?.lastName}</td>
                    <td className="p-4">{employee?.telephone}</td>
                    <td className="p-4">{employee?.address}</td>
                    <td className="p-4">{employee?.email}</td>
                    <td className="p-4">
                      {employee?.dateOfEmployment?.slice(0, 10)}
                    </td>
                    <td className="p-4">
                      {employee?.dateOfCancellation?.slice(0, 10) || ""}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          toggle();
                          setIsUpdate(true);
                          updateEmployeeData(employee?._id);
                        }}
                        className="bg-blue-700 rounded px-4 py-1.5 text-white text-base"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
