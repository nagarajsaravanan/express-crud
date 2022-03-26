const { successResponse, failureResponse } = require("../../utils/response")
const customerDocModel = require('./../../models/customerDocument.model')
const { mailService } = require('../emailController/emailController')
const { ObjectId } = require('mongoose').Types;
const fs = require('fs');

const get = async (req, res) => {
    const customerDocument = await customerDocModel.find({ user_id: req.authUser.id }).lean()
    successResponse(res, { response: customerDocument, message: 'Customer Document fetched successfully' })
}

const addOrUpdate = async (req, res) => {
    const { file } = req
    try {
        let saveData;
        const checkDoc = await customerDocModel.find({ file: `/documents/${req.authUser.id}.pdf` })
        const errorMsg = checkDoc ? 'failed to update the document details' : 'failed to add the document details'
        const successMsg = checkDoc ? 'document details updated successfully' : 'document details added successfully'
        if (checkDoc) {
            const data = {
                user_id: ObjectId(req.authUser.id),
                file: `/documents/${file.filename}`
            }
            saveData = await customerDocModel.findByIdAndUpdate(new ObjectId(checkDoc[0]._id), data, {
                new: true
            });
            updateInFile('Customer document updated by '+ req.authUser.name + ' on ' + new Date())
        } else {
            const data = {
                user_id: req.authUser.id,
                file: `/documents/${file.filename}`
            }
            saveData = await customerDocModel.create(data)
            updateInFile('Customer document created by '+ req.authUser.name + ' on ' + new Date())
        }
        saveData ? successResponse(res, { response: { user: saveData }, message: successMsg }) : failureResponse(res, { response: 1, message: errorMsg })
    } catch (error) {
        failureResponse(res, { response: 1, message: 'error updating customer document' })
    }
}

const updateInFile = async (message) => {
    const data = fs.appendFile('public/file/customerDocumentHistory.txt', message+ '\r\n', function (err) {
        if (err) throw err
      });
}

module.exports = { get, addOrUpdate }