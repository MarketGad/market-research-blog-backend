const express = require('express');
var passport = require('passport');

const User = require('../../Models/UserNewModel');
var authenticate = require('../../authenticate');


const UserRouter = express.Router();


// To be used for chat purposes
UserRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    User.aggregate()
        .match({ _id: { $not: { $eq: req.user._id } } })
        .match({ isEmailVerified: { $eq: true } })
        .project({
            __v: 0,
            salt: 0,
            hash:  0,
        })
        .exec((err, users) => {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 413
                res.end(JSON.stringify({ message: 'Failure' }));
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    status: "success",
                    users: users
                });
            }
        });
    // res.statusCode = 403;
    // res.end('operation not supported yet');
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

UserRouter.route('/profile')
.get(authenticate.verifyUser, (req, res, next) => {
    User.findById(req.user._id)
        .exec((err, user) => {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 413
                res.end(JSON.stringify({ message: 'Failure' }));
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    status: "success",
                    user: user
                });
            }
        });
    // res.statusCode = 403;
    // res.end('operation not supported yet');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.put(authenticate.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: req.body
    }, { new: true})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})

module.exports = UserRouter;