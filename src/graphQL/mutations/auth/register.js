const graphql = require("graphql");
const { GraphQLString } = graphql;

// GRAPHQL TYPES
const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  register_controller,
} = require("../../../controllers/auth/register_controller");

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

  async resolve(_, args) {
    let errors = validate(args);
    if (errors.length) return { errors };

    return await register_controller(args);
  },
};

module.exports = RegisterMutation;
