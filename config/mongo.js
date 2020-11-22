require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    retryWrites:false
})

// require('./dummy')

mongoose.Promise = global.Promise
mongoose.connection.once('open', function (err) {
    if (err) {
        console.log('error found: ', err)
    } else {
        console.log('you are connect to database.')
    }
})
