const mongoose = require('mongoose');

const Jobs = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    jobLink : {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    industry :{ 
        type: String,
        required: true,
    }
},{ timestamps: true }
)

module.exports = mongoose.model('jobs', Jobs);