import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config();
const app = express();

import { UserRoutes } from "./Routes/index.js";

app.use(express.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  if (!token) return res.status(401).json();

  try {
    var payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json();
  }
};

app.use("/api", UserRoutes);
app.get("/", verifyToken, (req, res) => {
  res.send("hello");
});

mongoose.set("strictQuery", false);
connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
  console.log("Success on port 5000");
  app.listen(process.env.PORT);
});
