// MONGODB MODELS
const jwt = require("jsonwebtoken");
const { checkUserExistance, checkPassword } = require("../../policies");

const login_controller = async (args) => {
  let { exUser, userErrors } = await checkUserExistance(args.email, true);
  if (userErrors.length) return { errors: userErrors };

  let { passwordErrors } = await checkPassword(args.password, exUser.password);
  if (passwordErrors.length) return { errors: passwordErrors };

  const Token = jwt.sign(
    {
      data: exUser,
    },
    "secret",
    { expiresIn: "12h" }
  );

  return {
    token: Token,
    user: exUser,
    errors: [],
  };
};

module.exports = {
  login_controller,
};
