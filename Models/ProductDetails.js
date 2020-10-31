const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: false
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NewUser'
		}
	},
	{
		timestamps: true
	}
);

const ProductDetails = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NewUser'
		},
		logo: {
			type: String,
			required: false
		},
		theme: {
			type: String,
			required: false
		},
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		websiteLink: {
			type: String,
			required: false
		},
		playStoreLink: {
			type: String,
			required: false
		},
		appStoreLink: {
			type: String,
			required: false
		},
		briefDescription: {
			type: String,
			required: false
		},
		detailedDescription: {
			type: String,
			required: false
		},
		upvotes: {
			type: Number,
			default: 0,
			required: false
		},
		upvotesList: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'NewUser',
		},

		// reputation point = 4 * no of comments + 1 * upvotes
		reputationPoint: {
			type: Number,
			default: 0,
			required: false
		},
		pointOfContact: {
			type: String,
			required: false
		},
		emailId: {
			type: String,
			trim: true,
			required: false,
			unique: true
		},
		tags: {
			type: [String],
			required: false,
		},
		// rating: {
		//     type: Number,
		//     min: 1,
		//     max: 5,
		//     default: 1,
		//     required: false,
		// },
		comments: [ CommentSchema ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('ProductDetails', ProductDetails);
