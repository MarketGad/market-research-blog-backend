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

const UpvotesList = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser',
        unique: true,
    }
})


const ProductDetails = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser',
    },
    logo: {
        type: String,
        default: "",
        required: false
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    websiteLink:{
        type: String,
        default: "",
        required: false
    },
    playStoreLink: {
        type: String,
        default: "",
        required: false,
    },
    appStoreLink: {
        type: String,
        default: "",
        required: false,
    },
    briefDescription: {
        type: String,
        default: "",
        required: false
    },
    detailedDescription: {
        type: String,
        default: "",
        required: false
    },
    upvotes: {
        type: Number,
        default: 0,
        required: false,
    },
    upvotesList: [UpvotesList],
    reputation: {
        type: Number,
        default: 0,
        required: false,
    },
    pointOfContact:{
        type: String,
        default: "",
        required: false
    },
    emailId:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    // rating: {
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //     default: 1,
    //     required: false,
    // },
    comments: [CommentSchema]


}, { timestamps: true });


module.exports = mongoose.model('ProductDetails', ProductDetails);