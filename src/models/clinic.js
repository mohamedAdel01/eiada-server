const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clinic = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  logo: String,
  theme_settings: String,
});

module.exports = mongoose.model("Clinic", Clinic);
