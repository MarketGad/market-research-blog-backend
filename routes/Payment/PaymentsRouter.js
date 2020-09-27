const express = require('express');
const PaymentRouter = express.Router();
const shortid = require('shortid');
const Razorpay = require('razorpay');


const User = require('../../Models/UserNewModel');
const Payment = require('../../Models/Payment/Payments');
const JobProfile = require('../../Models/JobProfile');

const passport = require('passport');
const authenticate = require('../../authenticate');
const config = require('../../config')

const razorpay = new Razorpay({
	key_id: config.RAZORPAY_ID,
	key_secret: config.RAZORPAY_SECRET
});

//  CALLBACK ENDPOINT
PaymentRouter.post('/verification', (req, res, next) => {
	// do a validation
	const secret = config.RAZORPAY_SECRET_HASH;

	console.log(req.body);
    const crypto = require('crypto');
	const shasum = crypto.createHmac('sha256', secret);
	shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');
    
    console.log(digest, req.headers['x-razorpay-signature']);

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit');
        // process it
        // console.log(req.body.payload.payment.entity)
        Payment.find({id: req.body.payload.payment.entity.order_id})
        .then(async (Order) => {
            console.log(Order)
            if(Order){
                Order[0].amount_paid = req.body.payload.payment.entity.amount
                Order[0].amount_due = Order[0].amount - Order[0].amount_paid
                Order[0].email = req.body.payload.payment.entity.email
                Order[0].attempts = Order[0].attempts + 1
                await Order.save()
                console.log("Order Placed Success")
                console.log(Order)
                res.statusCode = 200
                res.json({ status: 'ok' });
            }else {
                res.statusCode = 404
                res.json({status: "Not Ok"})
            }
        }, (err) => next(err))
        .catch((err) => next(err));
        
        // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4));
    } else {
        // pass it
        res.statusCode = 404
        res.json({status: "Not Legit"})
    }

});


PaymentRouter.post('/razorpay/:jobId', authenticate.verifyUser, (req, res, next)=> {

    JobProfile.findById(req.params.jobId)
    .then(async (user, err) => {
        if(user){
            // console.log(user)
            const payment_capture = 1;
            const amount = user.offeringPrice;
            const currency = 'INR';

            const options = {
                amount: amount,
                currency,
                receipt: shortid.generate(),
                payment_capture
            };


            const rpay_response = await razorpay.orders.create(options);
            console.log(rpay_response);

            // Payment req. created

            Payment.create(rpay_response)
            .then((profile) => {
                console.log('Payment Request Created ');
                res.statusCode = 200
                res.json({
                    id: rpay_response.id,
                    currency: rpay_response.currency,
                    amount: rpay_response.amount,
                    profile: profile
                });
                
            }, (err) => next(err))
            .catch((err) => next(err));

        }else {
            res.statusCode = 404
            res.json({status: "User Not Found", err: err})
        }
    });

});

module.exports = PaymentRouter;