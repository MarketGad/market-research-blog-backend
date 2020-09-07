const mongoose = require('mongoose');


// work on using mongoose.populate to populate the user details here.
const JobProfile = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser'
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