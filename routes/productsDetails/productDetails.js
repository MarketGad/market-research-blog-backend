const express = require('express');
const bodyParser = require('body-parser');



const productDetails = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');
const JobProfile = require('../../Models/JobProfile');

productDetails.use(bodyParser.json());

productDetails.route('/')
.get((req, res, next) => {
    JobProfile.find({})
    .populate('comments.author')
    .then((profiles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profiles)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    JobProfile.create(req.body)
    .then((profile) => {
        console.log('Profile Created ', profile);
        res.json(profile);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('delete operation not supported yet');
})



module.exports = productDetails;