const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Specialization = new Schema({
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
