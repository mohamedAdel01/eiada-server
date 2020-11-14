const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  doctor_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  patient_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  booking_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Checkup" , "Consultation"],
  },
  chief_complaint: String,
  session_summary: String,
  services: [{
    service_description: String,
    price: Number,
    status: {
      type: String,
      enum: ["Open" , "Closed"],
    },
    opened_at: {
      type: Date
    },
    closed_at: {
      type: Date
    }
  }],
  partial: [{
    description: String,
    price: Number,
  }],
  paid: Number,
  due_amount: Number
}, {timestamps: true});

Session.pre('update', function(next) {
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
