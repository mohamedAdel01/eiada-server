const User = require("../models/user");
const bcrypt = require("bcrypt");


const Create_User = async (args, role) => {
    const securedPassword = bcrypt.hashSync(args.password, 10);

    let userObj = new User({
      fullname: args.fullname,
      email: args.email,
      phone: args.phone,
      password: securedPassword,
      role: role,
    });

    return await userObj.save();
}

module.exports = {
    Create_User,
  };