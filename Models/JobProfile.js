const mongoose = require('mongoose');

// work on using mongoose.populate to populate the user details here.
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const JobProfile = new mongoose.Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NewUser',
			unique: true
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
			type: Currency,
			required: false,
			default: 1000,
		},
		profilePic: {
			type: String,
			required: false
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('JobProfile', JobProfile);
