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
  partial: [{
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

Session.pre('update', function(next) {
  // here we will calculate "due_amount"
  console.log(this)
  next()

  // const modifiedField = this.getUpdate().$set.field;
  // if (!modifiedField) {
  //     return next();
  // }
  // try {
  //     const newFiedValue = // do whatever...
  //     this.getUpdate().$set.field = newFieldValue;
  //     next();
  // } catch (error) {
  //     return next(error);
  // }
});

module.exports = mongoose.model("Session", Session);
