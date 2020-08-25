const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');

router.get('/logoutUser', (req, res, next) => {
	if(req.session){
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	} else {
		var err = new Error('You are not logged in');
		err.status = 403;
		next(err);
	}
});
module.exports = router;