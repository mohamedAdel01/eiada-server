const bcrypt = require("bcrypt");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;

const Create_Owner = async (args) => {
  const securedPassword = bcrypt.hashSync(args.password, 10);

  let userObj = new User({
    fullname: args.fullname,
    email: args.email,
    phone: args.phone,
    password: securedPassword,
    owner_id: "owner-admin",
    role: "owner-admin",
  });

  let owner = await userObj.save();

  return await User.findOneAndUpdate(
    { _id: ObjectId(owner._id) },
    { owner_id: owner._id },
    { new: true }
  );
};

const Add_User = async ({ owner_id, email, branch_id, role }) => {
  const securedPassword = bcrypt.hashSync("123456", 10);

  let userObj = new User({
    fullname: "--",
    email,
    phone: "--",
    branch_id,
    password: securedPassword,
    owner_id,
    role,
  });

  return await userObj.save();
};

const Update_User_Auth_Data = async (user_id, [key, value]) => {
  if (key === "password") value = bcrypt.hashSync(value, 10);

  return await User.findOneAndUpdate(
    { _id: ObjectId(user_id) },
    { [key]: value },
    { new: true }
  );
};

const Read_User = async (filter, page, limit) => {
  page = page ? page : 1;
  limit = limit ? limit : 10;

  return {
    users: User.find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(limit * (page - 1))),
    total: User.find(filter).countDocuments(),
  };
};

module.exports = {
  Create_Owner,
  Add_User,
  Read_User,
  Update_User_Auth_Data,
};
