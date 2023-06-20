const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const {
  Create_Owner,
  Update_User_Auth_Data,
} = require("../../../controllers/user");
const { send_verification_email } = require("../../../controllers/emails");

const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkEmailExistance, generateToken } = require("../../../policies");

const REGISTER = {
  type: RegisterType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { p_emailErrors } = await checkEmailExistance(args.email, false);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    let newUser = await Create_Owner(args);

    let Token = generateToken(newUser);

    let updatedUser = await Update_User_Auth_Data(newUser._id, [
      "token",
      Token,
    ]);

    await send_verification_email(newUser, "email", true);

    return {
      user: updatedUser,
      clinic: [],
      branches: [],
      errors: [],
      message: "Please check your Email to verify email",
    };
  },
};

module.exports = { REGISTER };
