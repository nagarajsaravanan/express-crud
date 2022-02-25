const express = require('express');
const app = express();
const port = 5000;

// body pareser
app.use(express.json());

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

app.listen(port, () => {
    console.log(`api is listening at ${port}`);
})