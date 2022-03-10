const express = require('express')
const productRoute = express.Router()
const { get, addOrUpdate, destroy } = require('./productsController.js')
const { product } = require('./../../validation/validator')
const validator = require('../../middleware/validation')
const isAuth = require('./../../middleware/verifyToken')

productRoute.get('/', get)
productRoute.post('/', isAuth(), validator(product.create), addOrUpdate)
productRoute.put('/:id', isAuth(), validator(product.update), addOrUpdate)
productRoute.delete('/:id', isAuth(), destroy)

module.exports = productRoute