const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Role = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = {
    Schema: Role,
    RoleModel: mongoose.model('Role', Role)
}