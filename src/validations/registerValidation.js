const validator = require('validator');

let errors = []

const checkEmpty = (key, user) => {
    check = validator.isEmpty(user[key], {ignore_whitespace:true})
    if (check) {
        errors.push({
            key: key,
            message: `${key} is Required!`
        })
    }
}

const validate = (user) => {
    errors = []
    for(key in user) {
        switch(key) {
            case 'fullname':
                checkEmpty(key, user)
              break;
            case 'email':
                checkEmpty(key, user)
                check = validator.isEmail(user[key])
                if (!check) {
                    errors.push({
                        key: key,
                        message: `Please provide a valid ${key}!`
                    })
                }
              break;
            case 'phone':
                checkEmpty(key, user)
                check = validator.isMobilePhone(user[key], ['ar-EG'], {strictMode: true})
                if (!check) {
                    errors.push({
                        key: key,
                        message: `Please provide a valid ${key}!`
                    })
                }
              break;
            case 'password':
                checkEmpty(key, user)
                check = validator.isLength(user[key], { min: 6, max: 16})
                if (!check) {
                    errors.push({
                        key: key,
                        message: `${key} must be between 6 and 16 letters`
                    })
                }
              break;
          }
    }

    return errors
}

module.exports = {
    validate
}