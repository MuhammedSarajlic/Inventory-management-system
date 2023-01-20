import { Supplier } from "../Models/index.js";

export async function getSuppliers(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function addSupplier(req, res) {
  try {
    const supplier = req.body;
    await Supplier.create(supplier);
    res.send({ message: "Supplier added" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateSupplier(req, res) {
  try {
    const { _id, ...updateData } = req.body;
    await Supplier.findOneAndUpdate({ _id }, { $set: updateData });
    res.send({ message: "Supplier updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
