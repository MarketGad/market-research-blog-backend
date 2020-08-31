const express = require('express');
const bodyParser = require('body-parser');



const productDetailsRouter = express.Router();
var passport = require('passport');
var authenticate = require('../../authenticate');

// SCHEMA
const User = require('../../Models/UserNewModel');
const ProductDetails = require('../../Models/ProductDetails');



productDetailsRouter.use(bodyParser.json());
productDetailsRouter.route('/')
.get((req, res, next) => {
    ProductDetails.find({})
    .populate('comments.author')
    .populate('user')
    .then((profiles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profiles)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    ProductDetails.create(req.body)
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



module.exports = productDetailsRouter;