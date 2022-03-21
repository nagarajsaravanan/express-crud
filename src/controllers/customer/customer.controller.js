const { successResponse, failureResponse } = require("../../utils/response")
const userModel = require('./../../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { mailService } = require('../emailController/emailController')
const { ObjectId } = require('mongoose').Types;

const login = async (req, res) => {
    try {
        const data = req.body
        const user = await userModel.find({ 'email': data.email }, 'user_name email phone, password').lean()
        if (user) {
            if (data.password && user[0].password) {
                const validPassword = await bcrypt.compare(data.password, user[0].password)
                if (validPassword) {
                    delete user[0].password
                    console.log('{ name: user[0].user_name, email: user[0].email }',{ name: user[0].user_name, email: user[0].email }, user)
                    var token = jwt.sign({ id: user[0]._id, name: user[0].user_name, email: user[0].email }, process.env.JWT_SECRET || "express-crud");
                    successResponse(res, { response: { user: { ...user[0], token } }, message: 'login successfully.' })
                } else {
                    failureResponse(res, { response: 1, message: 'invalid password.', status: 401 })
                }
            }
        } else {
            failureResponse(res, { response: 1, message: 'email id is not registered.', status: 401 })
        }
    } catch (error) {
        failureResponse(res, { response: null, message: 'try later.' })
    }
}

const addOrUpdateUser = async (req, res) => {
    const { user_name, email, password, phone, is_active } = req.body
    const { id } = req.params;
    const errorMsg = id ? 'failed to update the user details' : 'failed to add the user details'
    const successMsg = id ? 'User details updated successfully' : 'User details added successfully'
    try {
        let saveData;
        if (id) {
            const data = {
                user_name,
                email,
                phone,
                is_active
            }
            saveData = await userModel.findByIdAndUpdate(new ObjectId(id), data, {
                new: true
            });
        } else {
            const data = {
                user_name,
                email,
                password: await encriptPassword(password),
                phone,
                is_active: is_active ? is_active : true
            }
            saveData = await userModel.create(data)
        }
        delete saveData.password
        // send mail for the new customer
        if (id) {
            let data = { type: "new-customer", payload: saveData }
            await mailService(data);
        }
        saveData ? successResponse(res, { response: { user: saveData }, message: successMsg }) : failureResponse(res, { response: 1, message: errorMsg })
    } catch (error) {
        console.log('error', error)
        failureResponse(res, { response: 1, message: errorMsg })
    }
}

const encriptPassword = async password => {
    const salt = await bcrypt.genSaltSync(10)
    password = await bcrypt.hash(password, salt)
    return password
}

module.exports = { login, addOrUpdateUser }