import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();
import bcrypt from "bcrypt";
import User from "./Models/User.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/add-user", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (await User.findOne({ username })) {
      return res
        .status(400)
        .send({ error: "User with this username already exist" });
    }
    if (password.length < 8) {
      return res.status(400).send({ error: "Password is too short" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.send({ success: "User created" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mongoose.set("strictQuery", false);
connect(process.env.MONGODB_URL).then(() => {
  console.log("Success on port 5000");
  app.listen(process.env.PORT);
});
