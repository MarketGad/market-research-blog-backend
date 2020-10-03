const express = require('express');
const HireRouter = express.Router();
const shortid = require('shortid');
const Razorpay = require('razorpay');


const User = require('../../Models/UserNewModel');
const Payment = require('../../Models/Payment/Payments');
const JobProfile = require('../../Models/JobProfile');

const passport = require('passport');
const authenticate = require('../../authenticate');
const config = require('../../config')



//  CALLBACK ENDPOINT
HireRouter.post('/:jobId', authenticate.verifyUser,  (req, res) => {

    JobProfile.findById(req.params.jobId)
    .then(async (profile) => {
        if(profile){
            if(profile.hiredBy.indexOf(req.user._id) >= 0){
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, message: "You have already hired the person"})
            } else {
                profile.hiredBy.push(req.user._id)
                await profile.save();
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, message: "We will contact you soon"})
            }
        }else{
            res.statusCode = 404
            res.json({status: "Job Profile : Not Found"})
        }
    })
});


module.exports = HireRouter;