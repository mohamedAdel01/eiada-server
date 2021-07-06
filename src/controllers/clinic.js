const Clinic = require("../models/clinic");

const Create_Clinic = async ({ name, owner_id }) => {
  let clinicObj = new Clinic({
    name,
    owner_id,
  });

  let NewClinic = await clinicObj.save();

  return {
    clinic: NewClinic,
    message: "Clinic created successfully",
    errors: [],
  };
};

const Read_Clinic = async () => {
  return await Clinic.find({});
};

module.exports = {
  Create_Clinic,
  Read_Clinic,
};
