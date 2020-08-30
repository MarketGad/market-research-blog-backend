const mongoose = require('mongoose');

const JobProfile = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        trim: true,
        required: true,
    },
    lastname:{
        type: String,
        trim: true,
        required: true,
    },
    picture: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        default: " ",
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    isHired: {
        type: Number,
        required: false
    },
    connections: {
        type: [String],
        required: false,
    },
    skills: {
        type: [String],
        required: false
    }


}, { timestamps: true });


module.exports = mongoose.model('JobProfile', JobProfile);