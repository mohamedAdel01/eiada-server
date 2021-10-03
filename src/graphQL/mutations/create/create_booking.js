const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } = graphql;

const { Create_Booking } = require("../../../controllers/booking");

const { BookingResponseType } = require("../../types/types");
const { validate } = require("../../../validations");
const { decodeToken, checkBookingDate } = require("../../../policies");

const CREATE_BOOKING = {
  type: BookingResponseType,
  args: {
    booking_date: { type: new GraphQLNonNull(GraphQLString) },
    doctor_id: { type: new GraphQLNonNull(GraphQLID) },
    patient_phone: { type: new GraphQLNonNull(GraphQLString) },
    start_time: { type: new GraphQLNonNull(GraphQLFloat) },
    end_time: { type: new GraphQLNonNull(GraphQLFloat) },
  },

  async resolve(_, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let checkDate = await checkBookingDate(args);

    let { decoded } = decodeToken(root.headers.authorization, true);

    return await Create_Booking(args, checkDate, decoded.owner_id);
  },
};

module.exports = {
  CREATE_BOOKING,
};
