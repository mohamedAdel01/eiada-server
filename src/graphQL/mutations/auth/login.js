const graphql = require("graphql");
const { GraphQLString } = graphql;

// GRAPHQL TYPES
const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const { login_controller } = require("../../../controllers/auth/login_controller");
const { checkUserExistance, checkPassword, generateToken } = require("../../../policies");

const LoginMutation = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(parent, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { exUser, p_userErrors } = await checkUserExistance(args.email, true);
    if (p_userErrors.length) return { errors: p_userErrors };
    
    let { p_passwordErrors } = await checkPassword(args.password, exUser.password);
    if (p_passwordErrors.length) return { errors: p_passwordErrors };

    const Token = generateToken(exUser)

    return {
      token: Token,
      user: exUser,
      errors: [],
    };
  },
};

module.exports = LoginMutation;
