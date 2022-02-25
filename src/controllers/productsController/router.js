const express = require('express')
const productRoute = express.Router()
const { get, addOrUpdate, destroy } = require('./productsController.js')
const { product } = require('./../../validation/validator')
const validator = require('../../middleware/validation')

productRoute.get('/', get)
productRoute.post('/', validator(product.create), addOrUpdate)
productRoute.put('/:id', validator(product.update), addOrUpdate)
productRoute.delete('/:id', destroy)

module.exports = productRoute