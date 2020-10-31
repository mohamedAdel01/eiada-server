const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Update_Auth_Token } = require("../../../controllers/user");

const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkEmailExistance, checkPassword, generateToken } = require("../../../policies");

const LoginMutation = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(parent, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { exUser, p_emailErrors } = await checkEmailExistance(args.email, true);
    if (p_emailErrors.length) return { errors: p_emailErrors };
    
    let { p_passwordErrors } = await checkPassword(args.password, exUser.password);
    if (p_passwordErrors.length) return { errors: p_passwordErrors };

    exUser.token = ''

    const Token = generateToken(exUser)

    updatedUser = await Update_Auth_Token(exUser._id, Token);

    return {
      user: updatedUser,
      errors: [],
    };
  },
};

module.exports = LoginMutation;
