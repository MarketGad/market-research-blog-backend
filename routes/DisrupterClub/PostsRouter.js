const express = require('express');
var passport = require('passport');

const User = require('../../Models/UserNewModel');
const ClubPosts = require('../../Models/ClubPosts');
var authenticate = require('../../authenticate');


const PostsRouter = express.Router();

PostsRouter.route('/')
.get((req, res, next) => {
    ClubPosts.find({})
    .populate('user')
    .then((posts) => {
        // console.log(posts);
        if(posts.length > 0){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                posts
            });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    req.body.user = req.user._id;
    ClubPosts.create(req.body)
    .then((post) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json({
            status: "success",
            post: post
        });
        post.upvotes.push(post._id);
        post.save;
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