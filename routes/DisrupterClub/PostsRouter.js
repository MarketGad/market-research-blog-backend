const express = require('express');
var passport = require('passport');

const User = require('../../Models/UserNewModel');
const ClubPosts = require('../../Models/ClubPosts');
var authenticate = require('../../authenticate');
const productDetailsRouter = require('../productsDetails/productDetailsRouter');


const PostsRouter = express.Router();

PostsRouter.route('/')
.get((req, res, next) => {
    ClubPosts.find({})
    .populate('user')
    .populate('comments.author')
    .then((posts) => {
        // console.log(posts);
        if(posts.length > 0){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                posts
            });
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                posts : "No Posts Yet"
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


PostsRouter.route('/:postId/comments')
.get((req, res, next) => {
    ClubPosts.findById(req.params.postId)
    .populate('comments.author')
    .populate('user') 
    .then((post) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json({
            status: "success",
            comments: post.comments
        });
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    ClubPosts.findById(req.params.postId)
    .then((post) => {
        if(post != null){

            post.comments.push(req.body);
            post.save();

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "success",
                post: post
            });

        }
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

PostsRouter.route('/:postId/upvote')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported yet');
})
.post(authenticate.verifyUser, (req, res, next) => {
    ClubPosts.findById(req.params.postId)
    .then((post) => {
        console.log(post)
        if(post != null){

            if(post.upvotes.indexOf(req.user._id) >= 0){
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, message: "already upvoted"})
            } else {
                post.upvotes.push(req.user._id);
                post.save();
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, message: "upvote added"}) 
            }

        }
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