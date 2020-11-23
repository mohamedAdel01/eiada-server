const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema(
  {
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
      required: true,
    },
    creator_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Checkup", "Consultation"],
      required: true,
    },
    chief_complaint: String,
    session_summary: String,
    services: [
      {
        description: String,
        cost: {
          type: Number,
          default: 0,
        },
        continued: {
          type: Boolean,
          default: false,
        },
      },
    ],
    partials: [
      {
        description: String,
        cost: Number,
      },
    ],
    paid_amount: {
      type: Number,
      default: 0,
    },
    due_amount: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", Session);
