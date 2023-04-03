const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  school: { type: String, default: null },
  class: { type: String, default: null },
  name: { type: String, default: null },
});

module.exports = mongoose.model("section", sectionSchema);
