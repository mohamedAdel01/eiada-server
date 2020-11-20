const Patient = require("../models/patient");

const Create_Patient = async (args) => {

  let patientObj = new Patient({
    patient_name: args.patient_name,
    patient_phone: args.patient_phone,
    patient_email: args.patient_email,
    imageURL: args.imageURL
  });

  return await patientObj.save();
};

module.exports = {
  Create_Patient
};
