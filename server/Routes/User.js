import express from "express";
const app = express();
import { addUser } from "../Controllers/User.js";

app.post("/add-user", addUser);

export default app;
