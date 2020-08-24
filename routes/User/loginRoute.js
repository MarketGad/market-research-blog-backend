const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');

router.post('/loginUser', passport.authenticate('local'), (req, res) => {
    // console.log(req);
	var token = authenticate.getToken({_id: req.user._id});
    // console.log(token)
    userData = {
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        phone: req.user.phone,
    }
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, userDate: userData , status: 'You are successfully logged in!'});
  });

module.exports = router;