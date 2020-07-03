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
    specializations_ids: [String],
    theme_settings: String
})

module.exports = {
    Schema: Eiada,
    EiadaModel: mongoose.model('Eiada', Eiada)
}