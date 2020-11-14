const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Specialization = new Schema({
  field: {
    type: String,
    unique: true,
    required: true,
  },
  diviisions: [String]
}, {timestamps: true});

module.exports = mongoose.model("Specialization", Specialization);
