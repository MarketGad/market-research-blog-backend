const express = require('express');
var passport = require('passport');

const User = require('../../models/UserNewModel');
var authenticate = require('../../authenticate');


const UserRouter = express.Router();

UserRouter.route('/')
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

module.exports = UserRouter;