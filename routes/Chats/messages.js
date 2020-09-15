const express = require('express');
var passport = require('passport');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
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