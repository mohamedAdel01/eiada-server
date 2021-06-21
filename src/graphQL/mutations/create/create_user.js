const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql;

const { Add_User } = require("../../../controllers/user");
const { Create_Role } = require("../../../controllers/role");
const { send_verification_email } = require("../../../controllers/emails");

const { UserResponseType, RoleInputType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  checkRoleExist,
  checkEmailExistance,
  checkBranchExist,
} = require("../../../policies");

const CREATE_USER = {
  type: UserResponseType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    branch_id: { type: new GraphQLNonNull(GraphQLID) },
    jop_title: { type: GraphQLString },
    role_name: { type: new GraphQLNonNull(GraphQLString) },
    new_role: { type: new GraphQLNonNull(RoleInputType) },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { p_emailErrors } = await checkEmailExistance(args.email, false);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    let { p_branchErrors } = await checkBranchExist(args.branch_id, false);
    if (p_branchErrors.length) return { errors: p_branchErrors };

    if (args.role_name != "custom") {
      let newUser = await Add_User({
        email: args.email,
        branch_id: args.branch_id,
        role: args.role_name,
        jop_title: args.jop_title,
      });

      await send_verification_email(newUser, "email", true);

      return {
        user: newUser,
        message: "New user has been added successfully",
        errors: [],
      };
    }

    if (!args.new_role.custom) {
      let { p_roleErrors } = await checkRoleExist(args.new_role.name);
      if (p_roleErrors.length) return { errors: p_roleErrors };
    }

    let { role } = await Create_Role(args.new_role, args.email);

    let newUser = await Add_User({
      email: args.email,
      branch_id: args.branch_id,
      role: role.name,
      jop_title: role.jop_title,
    });

    await send_verification_email(newUser, "email", true);

    return {
      user: newUser,
      message: "New user has been added successfully",
      errors: [],
    };
  },
};

module.exports = {
  CREATE_USER,
};
