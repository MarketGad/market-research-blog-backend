const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');
var passport = require('passport');

router.post('/signupUser', async (req, res, next) => {
    // req.body={
    //      username
    //      email
    //      firstname
    //      lastname
    //      phone
    //      password
    // }
    
    console.log(req.body);
    User.register(new User(req.body), req.body.password, (err, user)=>{
        if(err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({err: err});
		} else {
            // user.lastname = req.body.lastname;
            // user.firstname = req.body.firstname;
            // user.phone = req.body.phone;
            // user.email = req.body.email;

			user.save((err, user) => {
				if(err) {
					res.statusCode = 500;
					res.setHeader('Content-Type', 'application/json');
					res.json({err: err});
					return;
				}
				passport.authenticate('local')(req,res, () => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({success: true, status: 'Registration Successful'});
				});
            });
        }
    });
});

module.exports = router;