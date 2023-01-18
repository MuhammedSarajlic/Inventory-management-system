import express from "express";
const app = express();
import { addEmployee, getEmployees } from "../Controllers/Employee.js";

app.post("/add", addEmployee);
app.get("/get", getEmployees);

export default app;
