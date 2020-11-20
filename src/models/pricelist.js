const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricelist = new Schema({
  specialization_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  services: [{
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    }
  }]
}, {timestamps: true});

module.exports = mongoose.model("pricelist", pricelist);
