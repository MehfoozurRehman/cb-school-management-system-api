const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, default: null },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  logo: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("school", schoolSchema);
