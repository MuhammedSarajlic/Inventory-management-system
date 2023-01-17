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
