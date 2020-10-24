const graphql = require("graphql");
const { GraphQLString } = graphql;

// GRAPHQL TYPES
const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations/register_validation");
const {
  register_controller,
} = require("../../../controllers/register_controller");

const RegisterMutation = {
  type: RegisterType,
  args: {
    fullname: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },

  async resolve(parent, args) {
    let validationErrors = validate(args);

    if (validationErrors.length)
      return {
        errors: validationErrors,
      };

    return await register_controller(args);
  },
};

module.exports = RegisterMutation;
