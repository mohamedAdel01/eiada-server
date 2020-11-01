const Clinic = require("../models/clinic");

const Create_Clinic = async ({ name, owner_id }) => {
  let clinicObj = new Clinic({
    name: name,
    owner_id: owner_id,
  });

  let NewClinic = await clinicObj.save();

  return {
    message: "Clinic created successfully",
    clinic: NewClinic,
    errors: [],
  };
};

module.exports = {
  Create_Clinic,
};
