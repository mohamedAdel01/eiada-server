const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    booking_date: {
      type: Date,
      required: true,
    },
    day_bookings: [
      {
        doctor_id: {
          type: String,
          required: true,
        },
        doctor_bookings: [
          {
            patient_phone: {
              type: String,
              required: true,
            },
            start_time: {
              type: Number,
              required: true,
            },
            end_time: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", Booking);
