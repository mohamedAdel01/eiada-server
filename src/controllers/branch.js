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

module.exports = {
  Create_Branch,
};
