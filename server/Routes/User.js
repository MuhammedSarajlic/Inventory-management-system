import express from "express";
const app = express();
import { addUser, checkUser } from "../Controllers/User.js";

app.post("/add-user", addUser);
app.post("/check-user", checkUser);

export default app;
