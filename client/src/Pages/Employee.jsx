import React from "react";

const Employee = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <p className="">Employee</p>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Telephone
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Date of employment
              </th>
              <th scope="col" class="px-6 py-3">
                Date of cancellation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Ime
              </th>
              <td class="px-6 py-4">Prezime</td>
              <td class="px-6 py-4">Telephone</td>
              <td class="px-6 py-4">Address</td>
              <td class="px-6 py-4">Email</td>
              <td class="px-6 py-4">DoC</td>
              <td class="px-6 py-4">DoC</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
