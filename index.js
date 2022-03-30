const express = require('express')
const dotenv = require('dotenv')
const { log } = require('./src/libs/logger')
dotenv.config()
const app = express();
const port = 5000;

// body pareser
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// public path
app.use(express.static('public'))

// mongodb connection
require('./src/config/db/mongodbConnection')();

// mysql connection
require('./src/config/db/mysqlConnection');

// product crud
app.use('/api/v1/product', require('./src/controllers/productsController/router'));

// image routes
app.use('/api/v1/image', require('./src/controllers/imageController/router'));

// login
app.use('/api/v1/customer', require('./src/controllers/customer/router'))

// file operations
app.use('/api/v1/document', require('./src/controllers/customerDocument/router'))

// file operations
app.use('/api/v1/query', require('./src/controllers/queryController/router'))

// error handler
app.use(require('./src/exceptionHandler/exceptionHandler'))

app.listen(port, () => {
    log.info(`API is listening at ${port}`);
})