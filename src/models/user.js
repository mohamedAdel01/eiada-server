const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  field: String,
  division: String,
  image: String,
  birthdate: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
