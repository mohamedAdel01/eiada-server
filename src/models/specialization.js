const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Specialization = new Schema({
  field: {
    type: String,
    unique: true,
    required: true,
  },
  diviisions: [String]
});

module.exports = mongoose.model("Specialization", Specialization);
