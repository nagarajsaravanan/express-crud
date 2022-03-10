const express = require('express')
const imageRoute = express.Router()
const { get, addImage } = require('./imageController')
const multer = require('multer')
const isAuth = require('./../../middleware/verifyToken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+'-'+file.originalname)
    }
})
const upload = multer({ storage: storage })

imageRoute.get('/', get)
imageRoute.post('/add', isAuth(), upload.single('image'), addImage)

module.exports = imageRoute