const mongoose = require('mongoose')

const mongodbConnection = async () => {
    const mongoDB = 'mongodb://localhost/express_crud'
    const connection = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('MongoDB connected successfully.')
    })

    mongoose.connection.on('error', err => {
        console.log(err)
    })
}

module.exports = mongodbConnection