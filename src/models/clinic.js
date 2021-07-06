const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clinic = new Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    logo: String,
    theme_settings: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinic", Clinic);
