const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');
const authenticate = require('../../authenticate');
const {cloudinary} = require('../../utils/cloudinary');
const cleanText = require('../../utils/cleanText');

// SCHEMA
const JobProfile = require('../../Models/JobProfile');
const User = require('../../Models/UserNewModel');
const Jobs = require('../../Models/Jobs');

const JobsRouter = express.Router();

JobsRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.post(authenticate.verifyUser, async (req, res, next) => {
    // console.log(req.body.companyName);
    // console.log(cleanText(req.body.companyName));
    if(req.body.logo){
        var flag = 0, count = 0;
        while(count < 3){
            await cloudinary.uploader.upload(req.body.logo, 
                {   
                    folder: "Company/Logo/", 
                    public_id: req.user._id + cleanText(req.body.companyName),
                    quality: "auto:low"
                },
                (error, result) => {
                    if(error){
                        console.log(`Iter: ${count+1} :: Job Addition Failed :: Company : ${req.body.companyName} | Title : ${req.body.title}`);
                    } else {
                        flag = 1;
                        console.log(result.secure_url)
                        req.body.logo = result.secure_url;
                        Jobs.create(req.body)
                        .then((job) => {
                            console.log(`Job Added :: Company : ${job.companyName} | Title : ${job.title}`);
                            res.statusCode = 200;
                            res.json(job);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                    }
            }, (err) => next(err))
            .catch((err) => next(err));

            if(flag == 1) break;
        }
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})


JobsRouter.route('/:jobType')
.get((req, res, next) => {
    Jobs.find({ type: req.params.jobType})
    .then((jobs) => {
        // console.log(jobs)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(jobs)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})

module.exports = JobsRouter;