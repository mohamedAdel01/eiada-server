const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Clinic = new Schema({
  address: {
    type: String,
    required: true,
  },
  specializations_ids: [String],
});

module.exports = mongoose.model("Clinic", Clinic);
