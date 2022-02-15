const express = require('express');
const app = express();
const port = 5000;

// body pareser
app.use(express.json());

// mongodb connection
require('./src/config/db/mongodbConnection')();

// product crud
app.use('/api/v1/product', require('./src/controllers/productsController/router'));

app.listen(port, () => {
    console.log(`api is listening at ${port}`);
})