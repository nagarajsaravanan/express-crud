const mongoose = require('mongoose')

module.exports = mongoose.model(
    'users',
    new mongoose.Schema({
        user_name: { type: String, default: null },
        email: { type: String, default: null, lowercase: true, trim: true, },
        phone: { type: Number, default: null },
        password: { type: String, default: null },
        access_token: { type: String, default: null },
        age: { type: Number, default: null },
        team: { type: String, default: null },
        is_active: { type: Boolean, default: true },
        access_token: { type: String, default: null }
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    ))