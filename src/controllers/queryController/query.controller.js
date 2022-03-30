const { successResponse, failureResponse } = require("../../utils/response")
const userModel = require('../../models/users.model')
const { log } = require('./../../libs/logger')

/** using project */
const aggregateUsingProject = async (req, res) => {
    try {
        const data = await userModel.aggregate([
            {
                $match: {}
            },
            {
                $project: {
                    _id: 0, user_data: {
                        name: "$user_name",
                        mail: "$email"
                    }
                }
            }
        ])
        successResponse(res, { response: { user: data }, message: 'query using aggregate project.' })
    } catch (e) {
        log.error(e)
        failureResponse(res, { response: null, message: e })
    }
}

/** using lookup, combine two collection data */
const aggregateUsingLookup = async (req, res) => {
    try {
        const data = await userModel.aggregate([
            {
                $match: {}
            },
            { $project: { _id: 0, user_name: 1, email: 1, phone: 1, team: 1 } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'team',
                    foreignField: 'product_name',
                    as: 'team'
                }
            }
        ])
        successResponse(res, { response: { user: data }, message: 'query using aggregate project.' })
    } catch (e) {
        log.error(e)
        failureResponse(res, { response: null, message: e })
    }
}

/** using unwind */
const aggregateUsingUnwind = async (req, res) => {
    try {
        const data = await userModel.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'team',
                    foreignField: 'product_name',
                    as: 'team'
                }
            },
            {
                $lookup: {
                    from: 'customer_documents',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'document'
                }
            },
            { $unwind : '$team' },
            { $unwind : '$document' },
            { $project: { 'user_name': 1, 'email': 1, 'phone': 1,'team.product_name': 1, 'team.product_description': 1, 'document.file': 1 } }
        ])
        successResponse(res, { response: { user: data }, message: 'query using aggregate project.' })
    } catch (e) {
        log.error(e)
        failureResponse(res, { response: null, message: e })
    }
}

/** using group */
const aggregateUsingGroup = async (req, res) => {
    try {
        const data = await userModel.aggregate([
            {
                $match: {}
            },
            { $group: { _id: '$team', totalemployee: { $sum : 1 } } }
        ])
        successResponse(res, { response: { user: data }, message: 'query using aggregate project.' })
    } catch (e) {
        log.error(e)
        failureResponse(res, { response: null, message: e })
    }
}

module.exports = { aggregateUsingProject, aggregateUsingLookup, aggregateUsingUnwind, aggregateUsingGroup }