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
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
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
        { _id: ObjectId(checkDate.exDate._id) ,"day_bookings.doctor_id":  args.doctor_id},
        {
          $push: { "day_bookings.0.doctor_bookings": doctor_booking },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
      break;

    default:
      break;
  }

  return await BookingObj.save();
};

module.exports = {
  Create_Booking,
  Update_Booking,
};
