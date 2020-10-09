const express = require('express');
var passport = require('passport');

const User = require('../../Models/UserNewModel');
const ClubPosts = require('../../Models/ClubPosts');
var authenticate = require('../../authenticate');


const PostsRouter = express.Router();

PostsRouter.route('/')
.get((req, res, next) => {
    ClubPosts.aggregate()
    .exec((err, posts) => {
        if(posts){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                posts: posts
            });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    ClubPosts.create(req.body)
    .then((err, post) => {
        res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                post: post
            });
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})

module.exports = PostsRouter;