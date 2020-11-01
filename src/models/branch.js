const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Branch = new Schema({
  address: {
    type: String,
    required: true,
  },
  specializations_ids: [String],
});

module.exports = mongoose.model("Branch", Branch);
