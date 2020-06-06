const mongoose = require('mongoose')

// this for auto increment
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const Eiada = require('../src/models/eiada')
const Patient = require('../src/models/patient')
const Service = require('../src/models/service')
const ServiceDetails = require('../src/models/serviceDetails')
const Session = require('../src/models/session')
const Specialization = require('../src/models/specialization')
const Subscription = require('../src/models/subscription')
const User = require('../src/models/user')

// auto increment------------
Eiada.Schema.plugin(autoIncrement.plugin, 'Eiada');
Patient.Schema.plugin(autoIncrement.plugin, 'Patient');
Service.Schema.plugin(autoIncrement.plugin, 'Service');
ServiceDetails.Schema.plugin(autoIncrement.plugin, 'ServiceDetails');
Session.Schema.plugin(autoIncrement.plugin, 'Session');
Specialization.Schema.plugin(autoIncrement.plugin, 'Specialization');
Subscription.Schema.plugin(autoIncrement.plugin, 'Subscription');
User.Schema.plugin(autoIncrement.plugin, 'User');

// ----------------------------

// dummy data -------------------------
new Eiada.EiadaModel({
    _id: 1,
    name: 'Soliman Clinic',
    owener_id: 1,
    location: 'Obour shabab',
    logo: 'https://www.logolynx.com/images/logolynx/67/670c86579275e651dc165d9eb9debe49.png',
    specializations_ids: [1,2,3]
}).save()


// patient
for (let i = 1; i < 10; i++) {
    new Patient.PatientModel({
        _id: i,
        firstname: 'patient',
        lastname: i,
        email: `patient_${i}@gmail.com`,
        phone: `0123456789${i}`,
        image: 'https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Sick-Fever-Ill-Sickness-Patient-Sweating-Avatar-512.png',
        chief_complaint: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum provident consequatur vel voluptas reprehenderit sed quam atque reiciendis nemo fugiat rem molestiae eius, dolorem ipsam aspernatur expedita dicta. Reprehenderit.',
        past_history: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum provident consequatur vel voluptas reprehenderit sed quam atque reiciendis nemo fugiat rem molestiae eius, dolorem ipsam aspernatur expedita dicta. Reprehenderit.',
        medical_history: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum provident consequatur vel voluptas reprehenderit sed quam atque reiciendis nemo fugiat rem molestiae eius, dolorem ipsam aspernatur expedita dicta. Reprehenderit.',
    }).save()
}

// user

// for owner
new User.UserModel({
    _id: 1,
    firstname: 'Adel',
    lastname: 'owner',
    email: `owner_@gmail.com`,
    password: `123456`,
    phone: `01234567891`,
    image: 'https://f0.pngfuel.com/png/340/946/man-face-illustration-avatar-user-computer-icons-software-developer-avatar-png-clip-art.png',
    position_id: '1',
    permission_id: '1',
    specialization_id: '1'
}).save()

for (let i = 2; i < 10; i++) {
    new User.UserModel({
        _id: i,
        firstname: 'Doctor',
        lastname: i,
        email: `Doctor_${i}@gmail.com`,
        password: `123456`,
        phone: `0123456789${i}`,
        image: 'https://f0.pngfuel.com/png/340/946/man-face-illustration-avatar-user-computer-icons-software-developer-avatar-png-clip-art.png',
        position_id: '2',
        permission_id: '2',
        specialization_id: '2'
    }).save()
}

// for secretary
new User.UserModel({
    _id: 10,
    firstname: 'Secretary',
    lastname: 10,
    email: `secretary_@gmail.com`,
    password: `123456`,
    phone: `01234567891`,
    image: 'https://f0.pngfuel.com/png/340/946/man-face-illustration-avatar-user-computer-icons-software-developer-avatar-png-clip-art.png',
    position_id: '1',
    permission_id: '1',
    specialization_id: '1'
}).save()

// for Service
for (let i = 1; i < 5; i++) {
    new Service.ServiceModel({
        _id: i,
        service_details_id: i,
        opened_at: i,
        closed_at: i
    }).save()
}

// for Service
for (let i = 1; i < 5; i++) {
    new ServiceDetails.ServiceDetailsModel({
        _id: i,
        specialization_id: i,
        name: `ServiceDetails ${i}`,
        price: i
    }).save()
}

// for Session
for (let i = 2; i < 10; i++) {
    new Session.SessionModel({
        _id: i,
        doctor_id: i,
        patient_id: i,
        time: new Date(),
        services_ids: [1,2,3,4,5],
        state: "Opened",
        partial: {
            description: 'test',
            price: 5
        },
        paid: i,
        total: 20
    }).save()
}

// for Specialization
for (let i = 1; i < 5; i++) {
    new Specialization.SpecializationModel({
        _id: i,
        specialization_id: i,
        name: `Specialization ${i}`
    }).save()
}

// for Subscription
for (let i = 1; i < 5; i++) {
    new Subscription.SubscriptionModel({
        _id: i,
        doctors_num: 10,
        specializations_num: 5,
        end_at: new Date(),
        price: 300
    }).save()
}

// ------------------------------------