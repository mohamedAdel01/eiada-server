const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Add_Member } = require("../../../controllers/user");

const { MessageType, RoleInputType } = require("../../types/types");
const { validate } = require("../../../validations");
const { decodeToken } = require("../../../policies");

const createMemberMutation = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
    role_id: {type: GraphQLString},
    new_role: {type: RoleInputType},
    field: {type: GraphQLString},
    division: {type: GraphQLString}
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    if(args.role_id) {
        return await Add_Member({ email: args.email });
    }

     
  },
};

module.exports = {
  Create_Member: createMemberMutation,
};
