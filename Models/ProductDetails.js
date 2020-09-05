const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser'
    },
}, {
    timestamps: true
});


const ProductDetails = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser',
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    upvotes: {
        type: Number,
        required: false,
    },
    downvotes: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
    comments: [CommentSchema]


}, { timestamps: true });


module.exports = mongoose.model('ProductDetails', ProductDetails);