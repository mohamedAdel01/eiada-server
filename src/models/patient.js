const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Patient = new Schema({
  patient_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    maxlength: 11,
    minlength: 11,
    trim: true,
    required: true,
    unique: true,
  },
  image: String,
  birthdate: Date,
  past_history: [String],
  sessions_history: [{
    doctor_id: String,
    note: String
  }]
},{timestamps: true});

module.exports = mongoose.model("Patient", Patient);
