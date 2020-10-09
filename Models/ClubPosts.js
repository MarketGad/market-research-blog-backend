const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
		comment: {
			type: String,
			required: false
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NewUser'
		}
	},{
		timestamps: true
	}
);

const ClubPosts = new mongoose.Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NewUser'
		},
		title: {
			type: String,
			required: false
		},
		description: {
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

		hashtag: {
			type: String,
			required: false,
		},

		comments: [ CommentSchema ]
	},{ timestamps: true }
);

module.exports = mongoose.model('club_posts', ClubPosts);
