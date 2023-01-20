import React, { useCallback, useContext, useEffect, useState } from "react";
import { AddSupplierModal } from "../components";
import { UserContext } from "../Helper/Context";
import useToggle from "../Hooks/useToggle";
import { getData, postData, updateData } from "../Utils/api";

const initialState = {
  id: "",
  name: "",
  jib: "",
  pdv: "",
  telephone: "",
  contactPerson: "",
  email: "",
  startDate: "",
  completionDate: "",
};

const Supplier = () => {
  const { token } = useContext(UserContext);
  const [isOpen, toggle] = useToggle();
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [supplierData, setSupplierData] = useState(initialState);

  const clearInputField = () => {
    setSupplierData(initialState);
  };

  const getSuppliers = useCallback(async () => {
    await getData("/api/supplier/get-suppliers", token).then((res) => {
      setSuppliers(res);
    });
  }, [token]);

  const handleAddSupplier = () => {
    postData("/api/supplier/add-supplier", supplierData).then(() => {
      setSuppliers([...suppliers, supplierData]);
      clearInputField();
    });
  };

  const updateSupplierData = (id) => {
    let supplier = suppliers.find((supplier) => supplier._id === id);
    setSupplierData({
      ...supplier,
      startDate: supplier?.startDate?.slice(0, 10),
      completionDate: supplier?.completionDate?.slice(0, 10),
    });
  };

  const updateSupplier = () => {
    updateData("/api/supplier/update", supplierData);
  };

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    <>
      {isOpen && (
        <AddSupplierModal
          toggle={toggle}
          setSupplierData={setSupplierData}
          handleAddSupplier={handleAddSupplier}
          supplierData={supplierData}
          clearInputField={clearInputField}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateSupplier={updateSupplier}
        />
      )}

      <div className="mt-32 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center my-8">
          <p className="text-3xl font-bold">Suppliers</p>
          <button
            onClick={toggle}
            className="px-4 py-2 text-sky-600 text-xl rounded"
          >
            + Add Supplier
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-6 pr-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  JIB
                </th>
                <th scope="col" className="px-4 py-3">
                  PDV
                </th>
                <th scope="col" className="px-4 py-3">
                  Telephone
                </th>
                <th scope="col" className="px-4 py-3">
                  Contact Person
                </th>
                <th scope="col" className="px-4 py-3">
                  email
                </th>
                <th scope="col" className="px-4 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Completion Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Update
                </th>
              </tr>
            </thead>
            {suppliers.length > 0 && (
              <tbody>
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="pl-6 pr-4 py-4">{supplier?.name}</td>
                    <td className="p-4">{supplier?.jib}</td>
                    <td className="p-4">{supplier?.pdv}</td>
                    <td className="p-4">{supplier?.telephone}</td>
                    <td className="p-4">{supplier?.contactPerson}</td>
                    <td className="p-4">{supplier?.email}</td>
                    <td className="p-4">{supplier?.startDate?.slice(0, 10)}</td>
                    <td className="p-4">
                      {supplier?.completionDate?.slice(0, 10) || ""}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          toggle();
                          setIsUpdate(true);
                          updateSupplierData(supplier?._id);
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

export default Supplier;
