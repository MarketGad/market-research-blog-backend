const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');
var authenticate = require('../../authenticate');

router.get('/logoutUser', (req, res, next) => {
	// console.log(Object.keys(req.connection))
	// console.log(req.session)
	// console.log(req.connection)

	if(req.cookies){
		res.clearCookie('session-id');
		// res.redirect('/');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({stauts: "Successfully Logged Out"});
		return;

	} else {
		var err = new Error('You are not logged in');
		err.status = 403;
		err.message = "User Not Logged In"
		next(err);
		// res.statusCode = 500;
		// res.setHeader('Content-Type', 'application/json');
		// res.json({err: "User Not Logged In"});
		// return;
	}
});
module.exports = router;