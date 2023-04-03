const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  school: { type: String, default: null },
  name: { type: String, default: null },
});

module.exports = mongoose.model("class", classSchema);
