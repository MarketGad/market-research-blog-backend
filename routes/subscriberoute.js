const express = require('express');
const router = express.Router();
const Subscriber = require('../Models/SubscriberModel');

router.post("/subscribe", async (req, res) => {
    const subscriber = await Subscriber.find({ email: req.body.email }).exec(async (err, user) => {
        if (!subscriber) {
            const newSubscriber = new Subscriber({
                email: req.body.email
            })
            console.log(req.body.email);
            const savedSubscriber = await newSubscriber.save();
            res.send({
                email: savedSubscriber.email
            });
        }
    });
});

module.exports = router;