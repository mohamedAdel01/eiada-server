const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Branch = new Schema(
  {
    owner_id: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    specializations_ids: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", Branch);
