const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
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
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    owner_id: {
      type: String,
      required: true
    },
    token: String,
    branch_id: String,
    jop_title: String,
    image: String,
    birthdate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
