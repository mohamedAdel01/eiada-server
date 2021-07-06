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

const Read_Clinic = async (owner_id) => {
  return await Clinic.find({owner_id});
};

module.exports = {
  Create_Clinic,
  Read_Clinic,
};
