const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');

router.post('/loginUser', (req, res, next)=> {
    passport.authenticate('local', async (err, user, info) => {
        if(user){
            // console.log("Logged In")
            if(user.isEmailVerified == true){
                console.log(user.firstname + " " + user.lastname + " Logged In");
                var token = authenticate.getToken({_id: user._id});
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.cookie('session-id', token, { httpOnly: false });
                user.salt = "Nikal Lawde"
                user.hash = "fuck your own ass"
                res.json({success: true, token: token, user: user , status: 'You are successfully logged in!'});
            } else {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: "Email Verification Status: False"});
                return;
            }
        } else {
            User.findOne({email : req.body.email}, (err, user) => {
                if(user){
                    err = { message : "Incorrect Password" }
                    res.statusCode = 405;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return;
                } else {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: "User Not Found"});
                    return;
                }
            });
        }
    })(req, res, next);
});

module.exports = router;