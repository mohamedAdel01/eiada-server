const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Create_User } = require("../../../controllers/user");
const { send_verification_email } = require("../../../controllers/emails");

const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkUserExistance, generateToken } = require("../../../policies");


const RegisterMutation = {
  type: RegisterType,
  args: {
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(_, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { p_userErrors } = await checkUserExistance(args.email, false);
    if (p_userErrors.length) return { errors: p_userErrors };

    let newUser = await Create_User(args, "admin");

    let Token = generateToken(newUser);

    await send_verification_email(newUser, "email", true);

    return {
      token: Token,
      message: "Please check your Email to verify email",
      user: newUser,
      errors: [],
    };
  },
};

module.exports = RegisterMutation;
