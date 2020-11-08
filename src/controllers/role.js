const Role = require("../models/role");

const Create_Role = async (role, user_email) => {

  let roleObj = new Role({
    name: role.custom ? user_email : role.name,
    custom: role.custom,
    create: role.create,
    read: role.read,
    update: role.update,
    delete: role.delete,
  });

  let NewRole = await roleObj.save();

  return {
    role: NewRole,
    message: "Role created successfully",
    errors: [],
  };
};

module.exports = {
  Create_Role,
};
