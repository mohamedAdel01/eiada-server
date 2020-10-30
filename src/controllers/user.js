const bcrypt = require("bcrypt");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;

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
};

const Update_Password = async (new_password, user_id) => {
  const new_password_hashed = bcrypt.hashSync(new_password, 10);

  await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { password: new_password_hashed }
  );
};

const Update_Email_Verify = async (user_id) => {
  await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { email_verified: true }
  );
};

module.exports = {
  Create_User,
  Update_Password,
  Update_Email_Verify,
};
