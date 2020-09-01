const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');

router.post('/loginUser', passport.authenticate('local'), (req, res) => {
    User.findOne({email : req.body.email}, (err, user) => {
        if(user){
            if(user.isEmailVerified) {
                var token = authenticate.getToken({_id: req.user._id});
                userData = {
                    _id: req.user._id,
                    username: req.user.username,
                    firstname: req.user.firstname,
                    lastname: req.user.lastname,
                    email: req.user.email,
                    phone: req.user.phone,
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, token: token, userData: userData , status: 'You are successfully logged in!'});
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: "Email Verification Status: False"});
                return;
            }
        } else {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: "User Not Found"});
            return;
        }
    })

  });

module.exports = router;