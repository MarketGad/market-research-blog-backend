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
    

    JobProfile.find({user: req.user._id})
    .then(async (err, user) => {
        if(user){

            if (digest === req.headers['x-razorpay-signature']) {
                console.log('request is legit');
                // process it
                require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4));
            } else {
                // pass it
            }
            res.json({ status: 'ok' }); //required for razorpay

        }else {
            res.statusCode = 404
            res.json({status: "User Not Found"})
        }
    });
	

	console.log(digest, req.headers['x-razorpay-signature']);

	
});


PaymentRouter.post('/razorpay', authenticate.verifyUser, (req, res, next)=> {

    JobProfile.find({user: req.user._id})
    .then(async (err, user) => {
        if(user){
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
            res.json({status: "User Not Found"})
        }
    });

});

module.exports = PaymentRouter;