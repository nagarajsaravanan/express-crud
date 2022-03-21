// import statements
const express = require('express')
const { addOrUpdateUser, login } = require('./customer.controller')
const { customer } = require('./../../validation/validator')
const validator = require('../../middleware/validation')
const isAuth = require('./../../middleware/verifyToken')

// variables
const router = express.Router()
// admin routes
router.post('/login', validator(customer.login), login)
router.post('/add', validator(customer.create), addOrUpdateUser);
router.put('/update/:id', isAuth(), validator(customer.update), addOrUpdateUser);

module.exports = router