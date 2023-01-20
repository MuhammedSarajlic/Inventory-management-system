import express from "express";
const app = express();
import {
  getSuppliers,
  addSupplier,
  updateSupplier,
} from "../Controllers/Supplier.js";

app.get("/get-suppliers", getSuppliers);
app.post("/add-supplier", addSupplier);
app.patch("/update", updateSupplier);

export default app;
