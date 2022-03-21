const mongoose = require('mongoose')

module.exports = mongoose.model(
    'customer_documents',
    new mongoose.Schema({
        user_id: Object,
        file: String
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    ))