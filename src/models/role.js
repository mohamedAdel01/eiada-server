const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  custom: {
    type: Boolean,
    default: false
  },
  create: {
    type: [String],
    default: []
  },
  read: {
    type: [String],
    default: []
  },
  update: {
    type: [String],
    default: []
  },
  delete: {
    type: [String],
    default: []
  },
}, {timestamps: true});

module.exports = mongoose.model("Role", Role);
