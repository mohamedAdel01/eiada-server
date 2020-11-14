const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Email_Verification = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }
},{timestamps: true});

module.exports = mongoose.model("Email_Verification", Email_Verification);
