const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } = graphql;

const { Create_Booking, Update_Booking } = require("../../../controllers/booking");

const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  decodeToken,
  checkUserExistance,
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

    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(decoded._id, root.headers.authorization, false);
    if (p_userErrors.length) return { errors: p_userErrors };

    let checkDate = await checkBookingDate(args)

    switch (checkDate.status) {
        case 1:
            await Create_Booking(args)
            break;
        case 2:
        case 3:
            await Update_Booking(args, checkDate)
            break;
        case 4:
            break;    
    }

    if (checkDate.status == 4) return {
        message: "",
        errors: [{
            key: "Validation",
            message: "Time is not available"
        }]
    }

    return {
        message: "Booking reserved",
        errors: []
    }

  },
};

module.exports = {
  Create_Booking: createBookingMutation,
};
