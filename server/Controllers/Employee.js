import { Employee } from "../Models/index.js";

export async function addEmployee(req, res) {
  try {
    const { firstName, lastName, telephone, address, email, doe } = req.body;
    await Employee.create({
      firstName,
      lastName,
      telephone,
      address,
      email,
      dateOfEmployment: new Date(Date.parse(doe)),
    });
    res.send({ message: "Employee added" });
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
