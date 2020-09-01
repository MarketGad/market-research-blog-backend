const express = require('express');
const bodyParser = require('body-parser');
const ResetPasswordRouter = express.Router();

var authenticate = require('../../authenticate');
const User = require('../../Models/UserNewModel');



ResetPasswordRouter.use(bodyParser.json());
ResetPasswordRouter.route('/')
    .post(authenticate.verifyUser, (req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(user){
                user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
                    res.statusCode = 403;
                    res.end('Please Enter Correct Old Password');
                })
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: "User Not Found"});
                return;
            }
        })
        
    });


module.exports = ResetPasswordRouter;