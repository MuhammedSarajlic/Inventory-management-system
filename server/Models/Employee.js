import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  telephoneNumber: String,
  address: String,
  email: String,
  dateOfEmployment: {
    type: Date,
    default: Date.now,
  },
  dateOfCancellation: {
    type: Date,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
