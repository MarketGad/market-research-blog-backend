const express = require('express');
const bodyParser = require('body-parser');


var authenticate = require('../../authenticate');
const config = require('../../config');
// SCHEMA

const ProductDetails = require('../../Models/ProductDetails');
const HotProductsRouter = express.Router();

HotProductsRouter.route('/')
.get( (req, res) => {
    // console.log("requested at hot")
    ProductDetails.find({})
    .sort({reputationPoint: -1})
    .limit(3)
    .populate('comments.author')
    .populate('user')
    .then((profiles) => {
        if(profiles){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({profiles: [], err: "No Products Availaible"})
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

HotProductsRouter.route('/recent')
.get( (req, res) => {
    // console.log("requested at hot")
    ProductDetails.find({})
    .sort({createdAt: -1})
    .limit(3)
    .populate('comments.author')
    .populate('user')
    .then((profiles) => {
        if(profiles){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({profiles: [], err: "No Products Availaible"})
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = HotProductsRouter;
