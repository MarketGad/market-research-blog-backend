const mongoose = require('mongoose');

// work on using mongoose.populate to populate the user details here.

const JobProfile = new mongoose.Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			unique: false,
			ref: 'NewUser'
		},
		isHired: {
			type: Number,
			required: false
		},
		hiredBy: {
			type: [mongoose.Schema.Types.ObjectId],
			required: false,
		},
		connections: {
			type: [ String ],
			required: false
		},
		skills: {
			type: [ String ],
			required: false
		},
		location: {
			type: [ String ],
			required: false
		},
		experience: {
			type: [ String ],
			required: false
		},
		qualification: {
			type: [ String ],
			required: false
		},
		passionateAbout: {
			type: [ String ],
			required: false
		},
		portfolioLink: {
			type: String,
			required: false
		},
		linkedIn: {
			type: String,
			required: false
		},
		serviceName: {
			type: String,
			required: false
		},
		breifDetails: {
			type: String,
			required: false
		},
		offeringPrice: {
			type: Number,
			required: false
		},
		profilePic: {
			type: String,
			required: false
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('JobProfile', JobProfile);
