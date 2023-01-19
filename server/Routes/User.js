import express from "express";
const app = express();
import { addUser, checkUser, changePassword } from "../Controllers/User.js";

app.post("/add-user", addUser);
app.post("/check-user", checkUser);
app.patch("/change-user", changePassword);

export default app;
