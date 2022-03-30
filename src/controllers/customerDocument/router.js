const express = require('express')
const fileRoute = express.Router()
const { get, addOrUpdate } = require('./documentController.js')
const isAuth = require('./../../middleware/verifyToken')
const { failureResponse } = require("../../utils/response")
const multer = require('multer')
const { log } = require('./../../libs/logger')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/documents/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${req.authUser.id}.pdf`
        cb(null, uniqueSuffix)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            log.error('please upload pdf file format')
            return cb(new Error('please upload pdf file format'));
        }
    }
})

fileRoute.get('/', isAuth(), get)
fileRoute.post('/', isAuth(), upload.single('customer_document'), addOrUpdate)
// fileRoute.put('/', isAuth(), upload.single('customer_document'), addOrUpdate)

module.exports = fileRoute