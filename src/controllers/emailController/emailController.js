const { successResponse, failureResponse } = require('../../utils/response')
const { ObjectId } = require('mongoose').Types;

// add or update single product details
const addOrUpdate = async (req, res) => {
    try {
        const { product_name, product_description, is_active } = req.body
        const { id } = req.params;
        const errorMsg = id ? 'failed to update the product details' : 'failed to add the product details'
        const successMsg = id ? 'Product details updated successfully' : 'Product details added successfully'
        if (id) {
            const data = {
                product_name,
                product_description,
                is_active
            }
            const updateData = await productModel.findByIdAndUpdate(new ObjectId(id), data, {
                new: true
            });

            updateData ? successResponse(res, { response: { products: updateData }, message: successMsg }) : failureResponse(res, { response: 1, message: errorMsg })
        } else {
            const data = {
                product_name,
                product_description,
                is_active,
                is_archived: false
            }
            const newData = await productModel.create(data)

            newData ? successResponse(res, { response: { products: newData }, message: successMsg }) : failureResponse(res, { response: 1, message: errorMsg })
        }
    } catch (error) {
        failureResponse(res, { response: 1, message: errorMsg })
    }
}

// soft delete the single record
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {
            is_archived: true
        }
        const updateData = await productModel.findByIdAndUpdate(new ObjectId(id), data, {
            new: true
        });

        updateData ? successResponse(res, { message: 'deleted successfully' }) : failureResponse(res, { message: 'error in delete the record' })
    } catch (error) {
        failureResponse(res, { response: 1, message: 'error in delete the record' })
    }
}


module.exports = { get, addOrUpdate, destroy }