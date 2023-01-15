import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();

import { UserRoutes } from "./Routes/index.js";

app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);

mongoose.set("strictQuery", false);
connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
  console.log("Success on port 5000");
  app.listen(process.env.PORT);
});
