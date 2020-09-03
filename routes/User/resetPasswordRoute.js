const express = require('express');
const bodyParser = require('body-parser');
const ResetPasswordRouter = express.Router();

var authenticate = require('../../authenticate');
const User = require('../../Models/UserNewModel');



ResetPasswordRouter.use(bodyParser.json());
ResetPasswordRouter.route('/resetpassword')
    .post(authenticate.verifyUser, (req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {

            if(user){
                console.log(user)
                console.log(req.body)
                user.changePassword(req.body.oldpassword, req.body.newpassword, (err, user) => {
                    if(err){
                        res.statusCode = 403;
                        res.json({err: err})
                        return
                    } else {
                        res.statusCode = 200;
                        res.json({success: "Successfully changed your password"})
                        return
                    }
                })
                user.save();
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: "User Not Found"});
                return;
            }
        })
        
    });


module.exports = ResetPasswordRouter;