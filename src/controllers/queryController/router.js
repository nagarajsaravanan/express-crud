// import statements
const express = require('express')
const { aggregateUsingProject, aggregateUsingLookup, aggregateUsingUnwind, aggregateUsingGroup } = require('./query.controller')

// variables
const router = express.Router()
router.get('/aggregate-using-project', aggregateUsingProject)
router.get('/aggregate-using-lookup', aggregateUsingLookup)
router.get('/aggregate-using-unwind', aggregateUsingUnwind)
router.get('/aggregate-using-group', aggregateUsingGroup)

module.exports = router