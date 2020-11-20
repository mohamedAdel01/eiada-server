const Booking = require("../models/booking");
const ObjectId = require("mongodb").ObjectID;

const Create_Booking = async (args) => {
  let BookingObj = new Booking({
    booking_date: args.booking_date,
    day_bookings: [
      {
        doctor_id: args.doctor_id,
        doctor_bookings: [
          {
            patient_phone: args.patient_phone,
            start_time: args.start_time,
            end_time: args.end_time,
          },
        ],
      },
    ],
  });

  return await BookingObj.save();
};

const Update_Booking = async (args, checkDate) => {
  switch (checkDate.status) {
    case 2:
      let day_bookings = {
        doctor_id: args.doctor_id,
        doctor_bookings: [
          {
            patient_phone: args.patient_phone,
            start_time: args.start_time,
            end_time: args.end_time,
          },
        ],
      };
      await Booking.findOneAndUpdate(
        { _id: ObjectId(checkDate.exDate._id) },
        {
          $push: { day_bookings: day_bookings },
        },
        function (error) {
          if (error) {
            console.log(error);
          }
        }
      );
      break;
    case 3:
      let doctor_booking = {
        patient_phone: args.patient_phone,
        start_time: args.start_time,
        end_time: args.end_time,
      };
      await Booking.findOneAndUpdate(
        { _id: ObjectId(checkDate.exDate._id) },
        {
          $push: { "day_bookings.$[outer].doctor_bookings": doctor_booking },
        },
        {
            "arrayFilters": [{"outer.doctor_id": ObjectId(args.doctor_id)}]
        },
        function (error) {
          if (error) {
            console.log(error);
          }
        }
      );
      break;
  }

  return true
};

module.exports = {
  Create_Booking,
  Update_Booking,
};
