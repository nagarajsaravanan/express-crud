const { successResponse, failureResponse } = require('../../utils/response')
const mysql = require('./../../config/db/mysqlConnection')
const { log } = require('./../../libs/logger')

// get all the iamge details
const get = async (req, res) => {
    try {
        const query = `SELECT image_name, CONCAT('http://localhost:5000', image_path) as image_path FROM image_details `
        mysql.query(query, (err, results, fields) => {
            if (!err) {
                successResponse(res, { message: 'image details fetched successfully', response: results })
            } else {
                failureResponse(res, { message: 'failed to fetch image details' })
            }
        })
    } catch (error) {
        log.error(error)
        failureResponse(res, { message: 'failed to fetch image details' })
    }
}

// add single image
const addImage = async (req, res) => {
    const { file } = req;
    try {
        const query = `INSERT INTO image_details (image_name, image_path) VALUES ('${file.filename}', '/images/${file.filename}')`
        mysql.query(query, (err, results, fields) => {
            if (!err) {
                successResponse(res, { message: 'image uploaded successfully', response: { file_name: file.filename, file_path: 'http://localhost:5000/images/' + file.filename } })
            } else {
                failureResponse(res, { message: 'failed to upload image' })
            }
        })
    } catch (error) {
        log.error(error)
        failureResponse(res, { message: 'failed to upload image' })
    }
}

module.exports = { get, addImage }