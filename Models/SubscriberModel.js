const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);

