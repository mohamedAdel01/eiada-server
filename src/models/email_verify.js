const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Email_Verification = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

module.exports = mongoose.model("Email_Verification", Email_Verification);
