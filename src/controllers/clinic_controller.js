const Clinic = require("../models/clinic");

const Clinic_Create = async (args) => {
  let clinicObj = new Clinic({
    name: args.name,
    owner_id: args.owner_id,
  });

  let NewClinic = await clinicObj.save();

  return {
    message: "Clinic created successfully",
    clinic: NewClinic,
    errors: [],
  };
};

module.exports = {
  Clinic_Create,
};
