const mongoose = require('mongoose');

const Jobs = new mongoose.Schema({
    companyName: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    jobLink : {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    }
},{ timestamps: true }
)

module.exports = mongoose.model('jobs', Jobs);