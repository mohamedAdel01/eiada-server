const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  create: [String],
  read: [String],
  update: [String],
  delete: [String],
});

module.exports = mongoose.model("Role", Role);
