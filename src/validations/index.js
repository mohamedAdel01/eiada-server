const validator = require("validator");

let errors = [];

const checkEmpty = (key, payload) => {
  check = validator.isEmpty(payload[key], { ignore_whitespace: true });
  if (check) {
    errors.push({
      key: key,
      message: `${key} is Required!`,
    });
  }
};

const validate = (payload) => {
  errors = [];
  for (key in payload) {
    switch (key) {
      case "fullname":
        checkEmpty(key, payload);
        break;
      case "email":
        checkEmpty(key, payload);
        check = validator.isEmail(payload[key]);
        if (!check) {
          errors.push({
            key: key,
            message: `Please provide a valid ${key}!`,
          });
        }
        break;
      case "phone":
        checkEmpty(key, payload);
        check = validator.isMobilePhone(payload[key], ["ar-EG"], {
          strictMode: true,
        });
        if (!check) {
          errors.push({
            key: key,
            message: `Please provide a valid ${key}!`,
          });
        }
        break;
      case "password":
        checkEmpty(key, payload);
        check = validator.isLength(payload[key], { min: 6, max: 16 });
        if (!check) {
          errors.push({
            key: key,
            message: `${key} must be between 6 and 16 letters`,
          });
        }
        break;
    }
  }

  return errors;
};

module.exports = {
  validate,
};
