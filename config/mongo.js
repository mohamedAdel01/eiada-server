const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/eiada', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
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
