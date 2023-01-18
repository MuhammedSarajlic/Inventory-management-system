import { Employee, User } from "../Models/index.js";
import bcrypt from "bcrypt";

export async function addEmployee(req, res) {
  try {
    const {
      firstName,
      lastName,
      telephone,
      address,
      email,
      username,
      password,
      dateOfEmployment,
    } = req.body;
    const employee = await Employee.create({
      firstName,
      lastName,
      telephone,
      address,
      email,
      dateOfEmployment,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      employee_id: employee._id,
      username,
      password: hashedPassword,
      role: "employee",
    });
    res.send({ message: "Employee and User added" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { _id, ...updateData } = req.body;
    await Employee.findOneAndUpdate({ _id }, { $set: updateData });
    res.send({ message: "Employee updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
