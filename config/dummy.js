
// const Eiada = require('../src/models/eiada')
// const Patient = require('../src/models/patient')
// const Service = require('../src/models/service')
// const ServiceDetails = require('../src/models/serviceDetails')
// const Session = require('../src/models/session')
// const Specialization = require('../src/models/specialization')
// const Subscription = require('../src/models/subscription')
// const User = require('../src/models/user')
const Role = require('../src/models/role')

// dummy data -------------------------
let roles = ['admin', 'doctor', 'secretary']
roles.forEach(role => {
    let roleObj = new Role({
        name: role
    })
    roleObj.save()
})