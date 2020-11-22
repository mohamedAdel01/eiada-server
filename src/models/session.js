const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  specialization_id: {
    type: String, // Schema.Types.ObjectId
    required: true,
  },
  doctor_id: {
    type: String,
    required: true,
  },
  patient_phone: {
    type: String,
    required: true
  },
  creator_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Checkup" , "Consultation"],
    required: true
  },
  chief_complaint: String,
  session_summary: String,
  services: [{
    description: String,
    continued: {
      type: Boolean,
      default: false
    },
    cost: {
      type: Number,
      default: 0
    }
  }],
  partials: [{
    description: String,
    cost: Number
  }],
  closed: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Number,
    default: 0
  },
  due_amount: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model("Session", Session);
