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
    unique: true,
  },
  image: String,
  birthdate: Date,
  role: {
    type: String,
    required: true,
  },
  specialization_id: {
    type: String,
    // required: true
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
