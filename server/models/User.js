const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  google_id: { type: String },
  role: { type: String, default: "Customer" },
});

module.exports = mongoose.model("User", userSchema);

//User schema se bude ještě předělávat