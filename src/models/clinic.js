const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clinic = new Schema({
  name: {
    type: String,
    required: true
  },
  activated: {
    type: Boolean,
    default: false,
  },
  logo: String,
  theme_settings: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Clinic", Clinic);
