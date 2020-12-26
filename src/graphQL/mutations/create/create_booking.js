const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } = graphql;

const { Create_Booking } = require("../../../controllers/booking");

const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  checkBookingDate
} = require("../../../policies");

const createBookingMutation = {
  type: MessageType,
  args: {
    booking_date: { type: new GraphQLNonNull(GraphQLString) },
    doctor_id: { type: new GraphQLNonNull(GraphQLID) },
    patient_phone: { type: new GraphQLNonNull(GraphQLString) },
    start_time: { type: new GraphQLNonNull(GraphQLFloat) },
    end_time: { type: new GraphQLNonNull(GraphQLFloat) }
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let checkDate = await checkBookingDate(args)

    if (checkDate.status == 4) return {
        message: "",
        errors: [{
            key: "Validation",
            message: "Time is not available"
        }]
    }

    await Create_Booking(args, checkDate)

    return {
        message: "Booking reserved",
        errors: []
    }

  },
};

module.exports = {
  Create_Booking: createBookingMutation,
};
