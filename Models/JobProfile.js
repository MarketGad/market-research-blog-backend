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
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: false,
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
        required: false,
    },
    location: {
        type: [String],
        required: false,
    },
    experience:{
        type: String,
        required: false,
    }


}, { timestamps: true });


module.exports = mongoose.model('JobProfile', JobProfile);