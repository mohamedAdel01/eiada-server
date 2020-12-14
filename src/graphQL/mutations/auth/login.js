const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { Update_Auth_Token } = require("../../../controllers/user");
const { Read_Clinic } = require("../../../controllers/clinic");
const { Read_Branchs } = require("../../../controllers/branch");

const { RegisterType } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  checkEmailExistance,
  checkPassword,
  generateToken,
} = require("../../../policies");

const LoginMutation = {
  type: RegisterType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { exUser, p_emailErrors } = await checkEmailExistance(args.email, true);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    let { p_passwordErrors } = await checkPassword(
      args.password,
      exUser.password
    );
    if (p_passwordErrors.length) return { errors: p_passwordErrors };

    exUser.token = "";

    // Hint we will make check activate clinic or not here before generate new token and login

    const Token = generateToken(exUser);

    updatedUser = await Update_Auth_Token(exUser._id, Token);

    let exClinic = await Read_Clinic();
    let exBranchs = await Read_Branchs();

    return {
      user: updatedUser,
      clinic: exClinic,
      branchs: exBranchs,
      errors: [],
    };
  },
};

module.exports = LoginMutation;
