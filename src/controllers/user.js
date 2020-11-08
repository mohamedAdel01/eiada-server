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
    role: role
  });

  return await userObj.save();
};

const Add_Member = async ({email, role}) => {
  const securedPassword = bcrypt.hashSync('123456', 10);

  let userObj = new User({
    fullname: 'New User',
    email: email,
    phone: "--",
    password: securedPassword,
    role: role
  });

  return await userObj.save();
};

const Update_Password = async (new_password, user_id) => {
  const new_password_hashed = bcrypt.hashSync(new_password, 10);

  return await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { password: new_password_hashed }
  );
};

const Update_Email_Verify = async (user_id) => {
  return await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { email_verified: true },
    { new: true }
  );
};

const Update_Auth_Token = async (user_id, Token) => {
  return await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { token: Token },
    { new: true }
  );
};

module.exports = {
  Create_User,
  Add_Member,
  Update_Password,
  Update_Email_Verify,
  Update_Auth_Token,
};
