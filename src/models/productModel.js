const mongoose = require('mongoose')

module.exports = mongoose.model(
    'products',
    new mongoose.Schema({
        product_name: String,
        product_description: String,
        is_archived: Boolean,
        is_active: Boolean
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    ))