const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  staff: { type: String, default: null },
  amount: { type: String, default: null },
  date: { type: String, default: null },
  status: { type: String, default: null },
  paid: { type: String, default: null },
});

module.exports = mongoose.model("pay", paySchema);
