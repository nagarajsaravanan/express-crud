const express = require('express')
const emailRoute = express.Router()
const { } = require('./emailController.js')
const { product } = require('./../../validation/validator')
const validator = require('../../middleware/validation')

emailRoute.post('/', validator(product.create), addOrUpdate)

module.exports = emailRoute