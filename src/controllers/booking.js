const Booking = require("../models/booking");
const ObjectId = require("mongodb").ObjectID;

const Create_Booking = async (args, checkDate) => {
  switch (checkDate.status) {
    case 1:
      let BookingObj = new Booking({
        booking_date: new Date(args.booking_date),
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
      await BookingObj.save();
      break;
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
        {
          upsert: true,
          new: true,
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
          arrayFilters: [{ "outer.doctor_id": args.doctor_id }],
          upsert: true,
          new: true,
        }
      );
      break;
  }

  return true;
};

module.exports = {
  Create_Booking
};
