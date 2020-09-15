const express = require('express');
var passport = require('passport');

const Message = require('../../Models/Chat/Message');
const Conversation = require('../../Models/Chat/Conversation');
var authenticate = require('../../authenticate');


const MessageRouter = express.Router();



MessageRouter.route('/')
.get((req, res, next) => {

})
.post((req, res, next) => {
    
})
.put((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})