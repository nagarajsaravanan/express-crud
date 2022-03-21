const { failureResponse } = require("./../utils/response")

const jsonErrorHandler = async (err, req, res, next) => {
    failureResponse(res, { response: null, message: err.message })
}

module.exports = jsonErrorHandler