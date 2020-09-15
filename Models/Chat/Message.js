const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for NewUser
const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversations',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'NewUser',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'NewUser',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = Message = mongoose.model('messages', MessageSchema);
