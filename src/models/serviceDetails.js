const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceDetails = new Schema({
  specialization_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("ServiceDetails", ServiceDetails);
