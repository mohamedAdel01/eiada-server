// MONGODB MODELS
const Clinic = require('../models/clinic')

const Add_Clinic = async (args) => {

    let clinicObj = new Clinic({
        name: args.name,
        owner_id: args.owner_id
    })

    let NewClinic = await clinicObj.save()

    return {
        clinic: NewClinic,
        errors: []
    }
     
}

module.exports = {
    Add_Clinic
}