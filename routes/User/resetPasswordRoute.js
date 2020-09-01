const express = require('express');
const bodyParser = require('body-parser');
const ResetPasswordRouter = express.Router();

var authenticate = require('../../authenticate');



ResetPasswordRouter.use(bodyParser.json());
ResetPasswordRouter.route('/')
    .post(authenticate.verifyUser, (req, res, next) => {
        
        ProductDetails.create(req.body)
        .then((profile) => {
            console.log('Profile Created ', profile);
            res.json(profile);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


module.exports = ResetPasswordRouter;