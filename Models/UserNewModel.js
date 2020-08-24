const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
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
    email: {
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

}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('NewUser', UserSchema);