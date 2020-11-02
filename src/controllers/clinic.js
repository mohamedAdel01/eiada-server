const Clinic = require("../models/clinic");

const Create_Clinic = async ({ name }) => {
  let clinicObj = new Clinic({
    name: name,
  });

  let NewClinic = await clinicObj.save();

  return {
    clinic: NewClinic,
    message: "Clinic created successfully",
    errors: [],
  };
};

module.exports = {
  Create_Clinic,
};
