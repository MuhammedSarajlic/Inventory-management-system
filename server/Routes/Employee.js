import express from "express";
const app = express();
import {
  addEmployee,
  getEmployees,
  updateEmployee,
} from "../Controllers/Employee.js";

app.post("/add", addEmployee);
app.get("/get", getEmployees);
app.patch("/update", updateEmployee);

export default app;
