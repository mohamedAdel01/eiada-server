const Branch = require("../models/branch");

const Create_Branch = async ({ address }) => {
  let branchObj = new Branch({
    address: address,
  });

  let NewBranch = await branchObj.save();

  return {
    branch: NewBranch,
    message: "Branch created successfully",
    errors: [],
  };
};

const Read_Branchs = async () => {
  return await Branch.find({});
};

module.exports = {
  Create_Branch,
  Read_Branchs
};
