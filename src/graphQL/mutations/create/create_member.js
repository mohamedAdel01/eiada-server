const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Add_Member } = require("../../../controllers/user");
const { Create_Role } = require("../../../controllers/role");

const { MessageType, RoleInputType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  decodeToken,
  checkRoleExist,
  checkEmailExistance,
  checkUserExistance,
} = require("../../../policies");

const createMemberMutation = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
    field: { type: GraphQLString },
    division: { type: GraphQLString },
    role_name: { type: GraphQLString },
    new_role: { type: RoleInputType },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(
      decoded._id,
      root.headers.authorization
    );
    if (p_userErrors.length) return { errors: p_userErrors };

    let { p_emailErrors } = await checkEmailExistance(args.email, false);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    if (args.role_name != "custom") {
      let newMember =  await Add_Member({ email: args.email, role: args.role_name });
      return {
        message: 'New member has been added successfully', 
        errors: []
      }
    }

    if (!args.new_role) {
      return {
        key: key,
        message: `new_role is Required!`,
      };
    }

    if (!args.new_role.custom) {
      let { p_roleErrors } = await checkRoleExist(args.new_role.name);
      if (p_roleErrors.length) return { errors: p_roleErrors };
    }

    let { role } = await Create_Role(args.new_role, args.email);

    let newMember = await Add_Member({ email: args.email, role: role.name });

    return {
      message: 'New member has been added successfully', 
      errors: []
    }
  },
};

module.exports = {
  Create_Member: createMemberMutation,
};
