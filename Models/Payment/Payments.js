const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for NewUser
const PaymentSchema = new Schema({
    email:{
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: false,
    },
    entity: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: false,
    },
    amount_paid: {
        type: Number,
        default: 0,
        required: false,
    },
    amount_due: {
        type: Number,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    receit: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    attempts: {
        type: Number,
        required: false,
    },

},{ timestamps: true });

module.exports = Message = mongoose.model('payments', PaymentSchema);
