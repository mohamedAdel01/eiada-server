const graphql = require("graphql");
const { GraphQLString } = graphql;

const { BookingResponseType } = require("../types/types");

const { decodeToken } = require("../../policies");
const { Read_Booking } = require("../../controllers/booking");

const BOOKINGS = {
  type: BookingResponseType,

  args: {
    booking_date: { type: GraphQLString },
  },

  resolve(_, args, root) {
    let { decoded } = decodeToken(root.headers.authorization, true);
    let filter = {
      owner_id: decoded.owner_id,
    };
    if (args.booking_date) filter["booking_date"] = args.booking_date;

    return Read_Booking(filter);
  },
};

module.exports = BOOKINGS;
