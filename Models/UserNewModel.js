const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		firstname: {
			type: String,
			trim: true,
			required: true
		},
		lastname: {
			type: String,
			trim: true,
			required: true
		},
		profilePic: {
			type: String,
			required: false
		},
		phone: {
			type: Number,
			required: false
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
			required: false
		},
		reputation: {
			type: String,
			required: false
		},
	},
	{ timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('NewUser', UserSchema);
