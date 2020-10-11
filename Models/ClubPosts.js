const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
		comment: {
			type: String,
			required: true
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
			required: true
		},
		description: {
			type: String,
			required: true
		},
		upvotes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'NewUser',
		},
		hashtag: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: false,
		},
		comments: [ CommentSchema ]
	},{ timestamps: true }
);

module.exports = mongoose.model('club_posts', ClubPosts);
