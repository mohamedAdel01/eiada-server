const validator = require("validator");

let v_errors = [];

const checkEmpty = (key, payload) => {
  check = validator.isEmpty(payload[key], { ignore_whitespace: true });
  if (check) {
    v_errors.push({
      key: key,
      message: `${key} is Required!`,
    });
  }
};

const validate = (payload) => {
  v_errors = [];
  for (key in payload) {
    switch (key) {
      case "fullname":
      case "name":
      case "role_name":
      case "address":
      case "branch_id":
      case "patient_name":
      case "patient_phone":
        checkEmpty(key, payload);
        break;

      case "email":
        checkEmpty(key, payload);
        check = validator.isEmail(payload[key]);
        if (!check) {
          v_errors.push({
            key: key,
            message: `Please provide a valid Email!`,
          });
        }
        break;

      case "phone":
      case "patient_phone":
        checkEmpty(key, payload);
        check = validator.isMobilePhone(payload[key], ["ar-EG"], {
          strictMode: true,
        });
        if (!check) {
          v_errors.push({
            key: key,
            message: `Please provide a valid Phone!`,
          });
        }
        break;
        
      case "password":
        checkEmpty(key, payload);
        check = validator.isLength(payload[key], { min: 6, max: 16 });
        if (!check) {
          v_errors.push({
            key: key,
            message: `Password must be between 6 and 16 letters`,
          });
        }
        break;

    }
  }

  return v_errors;
};

module.exports = {
  validate,
};
