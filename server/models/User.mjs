import { Schema, model } from "mongoose";

//User schema se bude ještě předělávat
const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  google_id: { type: String },
  role: { type: String, default: "Customer" },
});

export default model("User", userSchema);
