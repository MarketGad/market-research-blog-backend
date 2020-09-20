const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for NewUser
const PaymentSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    entity: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: false,
    },
    amount_paid: {
        type: String,
        required: false,
    },
    amount_due: {
        type: String,
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
    order_id: {
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
    created_at: {
        type: Number,
        required: false,
    },
    
});

module.exports = Message = mongoose.model('payments', PaymentSchema);
