const express = require('express');
const bodyParser = require('body-parser');




var passport = require('passport');
var authenticate = require('../../authenticate');
var {cloudinary} = require('../../utils/cloudinary');
// SCHEMA
const JobProfile = require('../../Models/JobProfile');
const User = require('../../Models/UserNewModel');


const jobProfileRouter = express.Router();

jobProfileRouter.route('/')
.get((req, res, next) => {
    JobProfile.find({})
    .populate('user')
    .then((profiles) => {

        profiles.sort(function(a,b){  
            if(a.user.reputation < b.user.reputation)  
               return 1;  
            else if(a.user.reputation > b.user.reputation)  
               return -1;  
        
            return 0;  
        })

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profiles)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, async (req, res, next) => {
    req.body.user = req.user._id
    if(req.body.skills) req.body.skills = req.body.skills.split(',')
    if(req.body.qualification) req.body.qualification = req.body.qualification.split(',')
    if(req.body.experience)req.body.experience = req.body.experience.split(',')
    if(req.body.passionateAbout)req.body.passionateAbout = req.body.passionateAbout.split(',')
    if(req.body.location)req.body.location = req.body.location.split(',')
    
    await cloudinary.uploader.upload(req.body.profilePic, 
        (error, result) => {
            // console.log(result, error)
            req.body.logo = result.url;
    })
    JobProfile.create(req.body)
    .then((profile) => {
        // console.log('Profile Created ', profile);
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

// PART 3

jobProfileRouter.route('/:jobId/addrating')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /jobprofiles/:jobid/addrating' + req.params.jobId);
})
.post(authenticate.verifyUser, (req, res, next) => {
    JobProfile.findById(req.params.jobId)
    .then(async ( job ) => {
        if( job != null){
            if(job.upvotes.indexOf(req.user._id) >= 0){
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, message: "already upvoted"})
            } else {
                job.upvotes.push(req.user._id)
                await job.save()
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, message: "upvote added"})
            }
        } else {
            err = new Error(' job '+ req.params.jobId+' not found.');
            err.status = 404;
            return next(err);
        }
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /jobprofiles/:jobid/addrating' + req.params.jobId);
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /jobprofiles/:jobid/addrating' + req.params.jobId);
});




module.exports = jobProfileRouter;