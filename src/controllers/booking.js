const Booking = require("../models/booking");
const ObjectId = require("mongodb").ObjectID;

const Create_Booking = async (args, checkDate, owner_id) => {
  let response = {
    booking: null,
    message: "Booking reserved",
    errors: [],
  };

  switch (checkDate.status) {
    case 1:
      let BookingObj = new Booking({
        owner_id,
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
      response.booking = await BookingObj.save();
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
      response.booking = await Booking.findOneAndUpdate(
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
      response.booking = await Booking.findOneAndUpdate(
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

    case 4:
      response = {
        message: "",
        errors: [
          {
            key: "Validation",
            message: "Time is not available",
          },
        ],
      };
      break;
  }

  return response;
};

const Read_Booking = async (filter) => {
  return {
    bookings: Booking.find(filter),
  };
};

module.exports = {
  Create_Booking,
  Read_Booking,
};
