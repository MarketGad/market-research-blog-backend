const express = require('express');
var passport = require('passport');

const Message = require('../../Models/Chat/Message');
const Conversation = require('../../Models/Chat/Conversation');
var authenticate = require('../../authenticate');


const MessageRouter = express.Router();



MessageRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('operation not supported yet');
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