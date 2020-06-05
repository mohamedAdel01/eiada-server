const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Eiada = new Schema({
    name: {
        type: String,
        required: true
    },
    owener_id: {
        type: String,
        required: true
    },
    location: String,
    logo: String,
    specializations_ids: [String]
})

module.exports = mongoose.model('eiada', Eiada)