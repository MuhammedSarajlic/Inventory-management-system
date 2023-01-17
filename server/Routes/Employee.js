import express from "express";
const app = express();
import { addEmployee } from "../Controllers/Employee.js";

app.post("/add", addEmployee);

export default app;
