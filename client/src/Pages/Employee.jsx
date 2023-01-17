import React from "react";
import { AddEmployeeModal } from "../components";
import useToggle from "../Hooks/useToggle";

const Employee = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      {isOpen && <AddEmployeeModal toggle={toggle} />}
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
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Telephone
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of employment
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of cancellation
                </th>
                <th scope="col" className="px-6 py-3">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ime
                </th>
                <td className="px-6 py-4">Prezime</td>
                <td className="px-6 py-4">Telephone</td>
                <td className="px-6 py-4">Address</td>
                <td className="px-6 py-4">Email</td>
                <td className="px-6 py-4">DoC</td>
                <td className="px-6 py-4">DoC</td>
                <td className="px-6 py-4">
                  <button className="bg-blue-700 rounded px-4 py-1.5 text-white text-base">
                    Update
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
