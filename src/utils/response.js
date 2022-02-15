const successResponse = async (res, data = {}) => {
    res.json({ 
        status: data.status ? data.status : 200,
        error: false, 
        message: data.message ? data.message : 'success',
        response: data.response ? data.response : ''
    })
}

const failureResponse = async (res, data = {}) => {
    res.json({
        status: data.status ? data.status : 500,
        error: true,
        message: data.message ? data.message : 'failure',
        response: data.response ? data.response : ''
    })
}

module.exports = { successResponse, failureResponse }