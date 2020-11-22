require('dotenv').config()
const mongoose = require('mongoose')

// mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`, {
mongoose.connect(`mongodb://eiada29:eiada29@ds145223.mlab.com:45223/eiada`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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
