const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subscription = new Schema({
  branches_num: {
    type: Number,
    required: true,
  },
  doctors_num: {
    type: Number,
    required: true,
  },
  specializations_num: {
    type: Number,
    required: true,
  },
  end_at: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("Subscription", Subscription);
