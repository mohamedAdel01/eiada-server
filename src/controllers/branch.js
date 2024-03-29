const Branch = require("../models/branch");

const Create_Branches = async ({ owner_id, addresses }) => {
  addresses.map((address) => (address.owner_id = owner_id));
  let NewBranches = await Branch.insertMany(addresses);

  return {
    branches: NewBranches,
    message: "Branches created successfully",
    errors: [],
  };
};

const Read_Branches = async (owner_id) => {
  return await Branch.find({ owner_id });
};

module.exports = {
  Create_Branches,
  Read_Branches,
};
