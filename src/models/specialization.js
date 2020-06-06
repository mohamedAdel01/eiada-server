const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Specialization = new Schema({
    specialization_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = {
    Schema: Specialization,
    SpecializationModel: mongoose.model('Specialization', Specialization)
}
