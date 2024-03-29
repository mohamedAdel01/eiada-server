const { parse } = require("graphql");
const { decodeToken, checkUserExistance } = require("../src/policies");

let unAutherized = [
  "LOGIN",
  "REGISTER",
  "CHANGE_PASSWORD",
  "FORGET_PASSWORD_REQUREST",
  "RESEND_VERIFICATION_EMAIL",
  "UPDATE_PASSWORD",
  "VERIFY_EMAIL",
];

const auth_check = async (req, res, next) => {
  let operation_name = parse(req.body.query).definitions[0].selectionSet
    .selections[0].name.value;

  if (!unAutherized.includes(operation_name)) {
    if (!req.headers.authorization)
      return res.status(401).json({
        errors: [
          {
            key: "autherizatoin",
            message: "You aren'n Autherized, Please Login",
          },
        ],
      });

    let { decoded, errors } = decodeToken(req.headers.authorization, false);
    if (errors.length) return res.status(401).json({ errors });

    let { exUser, p_userErrors } = await checkUserExistance(
      decoded._id,
      req.headers.authorization,
      false
    );

    if (p_userErrors.length)
      return res.status(400).json({ errors: p_userErrors });

    if (!exUser.token)
      return res.status(401).json({
        errors: [
          {
            key: "autherizatoin",
            message:
              "For your security, Your Session is expired, So please login again",
          },
        ],
      });
  }

  next();
};

module.exports = {
  auth_check,
};
