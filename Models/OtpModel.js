const mongoose = require('mongoose');

const OtpModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('otp', OtpModel);