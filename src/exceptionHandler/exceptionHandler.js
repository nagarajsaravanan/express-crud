const { failureResponse } = require("./../utils/response")
const { log } = require('./../libs/logger')

const jsonErrorHandler = async (err, req, res, next) => {
    if(err){
        log.log(err)
        failureResponse(res, { response: null, message: err.message })
    }
}

module.exports = jsonErrorHandler