const { failureResponse } = require('./../utils/response')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const isAuth = () => {
    return async (req, res, next) => {
        const token = req.headers.auth;
        try {
            const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET || "express-crud")
            if(jwtPayload){
                req.authUser = jwtPayload;
                next();
            } else {
                return failureResponse(res, { status: 401, message: 'please login to continue.' });
            }
        } catch (error) {
            return failureResponse(res, { status: 401, message: 'please login to continue.' });
        }
        return false;
    };
}

module.exports = isAuth;