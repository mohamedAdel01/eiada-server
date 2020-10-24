const graphql = require("graphql");
const { GraphQLString } = graphql;

// GRAPHQL TYPES
const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations/register_validation");
const { login_controller } = require("../../../controllers/login_controller");

const LoginMutation = {
  type: RegisterType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(parent, args) {
    let validationErrors = validate(args);

    if (validationErrors.length)
      return {
        errors: validationErrors,
      };

    return await login_controller(args);
  },
};

module.exports = LoginMutation;
