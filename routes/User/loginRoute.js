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
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.cookie('session-id', token, { httpOnly: false });
                res.json({success: true, token: token, user: user , status: 'You are successfully logged in!'});
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