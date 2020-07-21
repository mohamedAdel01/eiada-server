const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Clinic = new Schema({
    clinic_name: {
        type: String,
        required: true
    },
    clinic_phone: {
        type: String,
        maxlength: 11,
        minlength: 11,
        trim: true,
        unique: true
    },
    owner_id: {
        type: String,
        required: true
    },
    location: String,
    logo: String,
    specializations_ids: [String],
    theme_settings: String
})

module.exports = {
    Schema: Clinic,
    ClinicModel: mongoose.model('Clinic', Clinic)
}