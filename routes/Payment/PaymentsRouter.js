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
PaymentRouter.post('/verification', (req, res) => {
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
        Payment.find({order_id: req.body.payload.payment.entity.order_id})
        .then(async (err, Order) => {
            if(Order){
                Order.amount_paid = req.body.payload.payment.entity.amount
                Order.amount_due = Order.amount - Order.amount_paid
                Order.email = req.body.payload.payment.entity.email
                Order.attempts = Order.attempts + 1
                await Order.save()
            }else {
                res.statusCode = 404
                res.json({status: "Not Ok"})
            }
        });
        
        // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4));
    } else {
        // pass it
    }

    

    // required by razorpay
    res.json({ status: 'ok' });
	


	
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

            try {
                const rpay_response = await razorpay.orders.create(options);
                console.log(rpay_response);

                // Payment req. created

                Payment.create(rpay_response)
                .then((profile) => {
                    console.log('Payment Request Created ');
                    res.json(profile);
                }, (err) => next(err))
                .catch((err) => next(err));

                // response

                res.statusCode = 200
                res.json({
                    id: rpay_response.id,
                    currency: rpay_response.currency,
                    amount: rpay_response.amount
                });

            } catch (error) {
                console.log(error);
            }
        }else {
            res.statusCode = 404
            res.json({status: "User Not Found", err: err})
        }
    });

});

module.exports = PaymentRouter;