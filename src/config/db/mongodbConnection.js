const mongoose = require('mongoose')
const { log } = require('./../../libs/logger')

const mongodbConnection = async () => {
    const mongoDB = 'mongodb://localhost/express_crud'
    const connection = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        log.info('MongoDB connected successfully.')
    })

    mongoose.connection.on('error', err => {
        log.error(err)
    })
}

module.exports = mongodbConnection