const { parse } = require("graphql");
const { decodeToken, checkUserExistance } = require("../src/policies");

let unAutherized = ["LOGIN", "REGISTER"];

const auth_check = async (req, res, next) => {
  let operation_name = parse(req.body.query).definitions[0].selectionSet
    .selections[0].name.value;

  if (!unAutherized.includes(operation_name)) {
    let { decoded, errors } = decodeToken(req.headers.authorization, false);
    if (errors.length) return res.status(400).json({ errors });

    let { p_userErrors } = await checkUserExistance(
      decoded._id,
      req.headers.authorization,
      false
    );
    if (p_userErrors.length)
      return res.status(400).json({ errors: p_userErrors });
  }

  next();
};

module.exports = {
  auth_check,
};
