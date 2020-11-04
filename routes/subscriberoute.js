const express = require('express');
const router = express.Router();
const Subscriber = require('../Models/SubscriberModel');

router.post("/", async (req, res) => {
    Subscriber.findOne({ email: req.body.email })
    .then(async (email) => {
        // console.log(email)
        if (email) {
            res.statusCode = 400;
            res.json({
                message: "already subscribed"
            })
        } else {
            Subscriber.create({email: req.body.email})
            .then((email) => {
                console.log(`Added Subscriber :: Email ID : ${email.email}`)
                res.statusCode = 200;
                res.json({
                    email: email
                })
            })
        }
    });
});

module.exports = router;