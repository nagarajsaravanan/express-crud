const express = require('express')
const product = express.Router()
const { get, addOrUpdate, destroy } = require('./productsController.js')

product.get('/', get)
product.post('/', addOrUpdate)
product.put('/:id', addOrUpdate)
product.delete('/:id', destroy)

module.exports = product