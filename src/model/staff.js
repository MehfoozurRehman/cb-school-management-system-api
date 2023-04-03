const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  school: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  role: {
    type: String,
    enum: ["admin", "teacher", "other"],
    default: "other",
  },
  pay: { type: String, default: null },
});

module.exports = mongoose.model("staff", staffSchema);
