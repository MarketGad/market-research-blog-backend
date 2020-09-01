const express = require('express');
const router = express.Router();

// Import models
const User = require('../../Models/UserNewModel');

var passport = require('passport');
var nodemailer = require("nodemailer");


const config = require('../../config');

// console.log(config)

var smtpTransport = nodemailer.createTransport({

    service: "Gmail",
    auth: {
        user: config.MAIL_ID,
        pass: config.MAIL_PASS,
    }
});

function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

var otp = getRandomArbitrary(123456, 987654);

// a dict to store otp based on email.
var StoreOtpValue = new Map();

router.post('/signupUser', async (req, res, next) => {
    // req.body={
    //      username
    //      email
    //      firstname
    //      lastname
    //      phone
    //      password
    // }
    
    // console.log(req.body);
    User.register(new User(req.body), req.body.password,  (err, user)=>{
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
				passport.authenticate('local')(req,res, async () => {
                    console.log("before mail")
                    console.log(req.body);
                    otp = getRandomArbitrary(123456, 987654);
                    // user.otp = otp;
                    // user.save();

                    // const otpModelParameter = {
                    //     email: req.body.email,
                    //     otp: otp
                    // }
                    // OtpModel.create(otpModelParameter);

                    StoreOtpValue.set(req.body.email, otp);

                    var mailOptions = {
                        from:`${"no-reply-otp-verification@marketgad.com"}`,
                        to : `${req.body.email}`,
                        subject : `Please don't reply to this mail`,
                        html:   `<div >
                                    <h3>
                                        use this OTP to verify your MarketGad account.<br>
                                    </h3>
                                    <div style="padding: 10px;background-color: #dedede;text-align: center; font-size: 40px ">
                                            <p>${otp}</p>
                                    </div>
                                    <h3>Don't Reply</h3>
                                </div>`,
                
                    }

                    await smtpTransport.sendMail(mailOptions, (error, response) => {
                        if(error){
                            console.log("ERROR");
                            console.log(error);
                        }else{
                            console.log(response);
                            // console.log("Message sent: " + response);
                        }
                        // smtpTransport.close();
                    })

					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({success: true, status: 'Registration Successful'});
				});
            });
        }
    });
});

router.post('/sendotp', async (req,res) => {
    User.findOne({email: req.body.email} , async (err, user) => {
        if(user){
            otp = getRandomArbitrary(123456, 987654);
            user.otp = otp;
            user.save();

            // update the otp map
            StoreOtpValue.set(req.body.email, otp);

            var mailOptions = {
                from:`${"no-reply-otp-verification@marketgad.com"}`,
                to : `${req.body.email}`,
                subject : `Please don't reply to this mail`,
                html:   `<div >
                            <h3>
                                use this OTP to verify your MarketGad account.<br>
                            </h3>
                            <div style="padding: 10px;background-color: #dedede;text-align: center; font-size: 40px ">
                                    <p>${otp}</p>
                            </div>
                            <h3>Don't Reply</h3>
                        </div>`,

            }

            await smtpTransport.sendMail(mailOptions, (error, response) => {
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent");
                    console.log(response);
                }
                // smtpTransport.close();
            })

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Mail sent successfully !'});
            return;
        } else {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: "User Not Found"});
            return;
        }
    });

    

})


router.post('/otpverify', async ( req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(user){
            console.log(user);
            if(req.body.otp == StoreOtpValue.get(req.body.email)) {
                user.isEmailVerified = true;
                user.save()
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Email verification successfull !'});
                return;
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, status: 'Incorrect OTP !'});
                return;
            }
        } else {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: "User Not Found"});
            return;
        }
    })
})

module.exports = router;