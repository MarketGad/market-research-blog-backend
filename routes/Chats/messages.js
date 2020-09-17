const express = require('express');
var passport = require('passport');

const Message = require('../../Models/Chat/Message');
const Conversation = require('../../Models/Chat/Conversation');
var authenticate = require('../../authenticate');


const MessageRouter = express.Router();


MessageRouter.route('/')
.get( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.post((req, res, next) => {
    // Code goes here
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
})

MessageRouter.route('/conversations')
.get( authenticate.verifyUser, (req, res, next) => {
    let from = req.user._id
    Conversation.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'recipients',
                foreignField: '_id',
                as: 'recipientObj',
            },
        },
    ])
    .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
    .project({
        'recipientObj.password': 0,
        'recipientObj.__v': 0,
        'recipientObj.date': 0,
    })
    .exec((err, conversations) => {
        if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else {
            res.send(conversations);
        }
    });
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



MessageRouter.route('/conversations/query')
.get( authenticate.verifyUser, (req, res, next) => {
    let user1 = req.user._id
    let user2 = req.query.userId
    Message.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'to',
                foreignField: '_id',
                as: 'toObj',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'from',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
    .match({
        $or: [
            { $and: [{ to: user1 }, { from: user2 }] },
            { $and: [{ to: user2 }, { from: user1 }] },
        ],
    })
    .project({
        'toObj.password': 0,
        'toObj.__v': 0,
        'toObj.date': 0,
        'fromObj.password': 0,
        'fromObj.__v': 0,
        'fromObj.date': 0,
    })
    .exec((err, messages) => {
        if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else {
            res.send(messages);
        }
    });
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




module.exports = MessageRouter;
