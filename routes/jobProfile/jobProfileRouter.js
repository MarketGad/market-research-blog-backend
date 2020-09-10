const express = require('express');
const bodyParser = require('body-parser');



const jobProfileRouter = express.Router();
var passport = require('passport');
var authenticate = require('../../authenticate');

// SCHEMA
const JobProfile = require('../../Models/JobProfile');
const User = require('../../Models/UserNewModel');


jobProfileRouter.use(bodyParser.json());

jobProfileRouter.route('/')
.get((req, res, next) => {
    JobProfile.find({})
    .populate('user')
    .then((profiles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profiles)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    req.body.user = req.user._id
    JobProfile.create(req.body)
    .then((profile) => {
        console.log('Profile Created ', profile);
        res.json(profile);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not supported');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('delete operation not supported');
})


// PART 2

jobProfileRouter.route('/:jobId')
.get((req, res, next) => {
    JobProfile.findById(req.params.jobId)
    .populate('user')
    .then((job)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /jobprofiles/' + req.params.jobId);
})
.put( authenticate.verifyUser,  (req, res, next) => {
    JobProfile.findByIdAndUpdate(req.params.jobId, {
        $set: req.body
    }, { new: true})
    .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( authenticate.verifyUser, (req, res, next) => {
    JobProfile.findByIdAndRemove(req.params.jobId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});




module.exports = jobProfileRouter;