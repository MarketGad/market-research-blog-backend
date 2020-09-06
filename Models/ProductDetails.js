const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
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
        default: "",
        required: false
    },
    description: {
        type: String,
        default: "",
        required: false
    },
    upvotes: {
        type: Number,
        default: 0,
        required: false,
    },
    reputation: {
        type: Number,
        default: 0,
        required: false,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
        required: false,
    },
    link: {
        type: String,
        default: "",
        required: false,
    },
    comments: [CommentSchema]


}, { timestamps: true });


module.exports = mongoose.model('ProductDetails', ProductDetails);