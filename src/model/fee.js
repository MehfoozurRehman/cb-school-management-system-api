const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  school: { type: String, default: null },
  class: { type: String, default: null },
  term: { type: String, default: null },
  amount: { type: String, default: null },
  date: { type: String, default: null },
  status: { type: String, default: null },
  paid: { type: String, default: null },
  discount: { type: String, default: null },
  student: { type: String, default: null },
});

module.exports = mongoose.model("fee", feeSchema);
