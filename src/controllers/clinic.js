const Clinic = require("../models/clinic");

const Create_Clinic = async ({ name }) => {
  let clinicObj = new Clinic({
    name: name
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
