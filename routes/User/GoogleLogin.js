const express = require('express');
const GoogleRouter = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../../Models/UserNewModel');
const jwt = require('jsonwebtoken');
const config = require('../../config');
var authenticate = require('../../authenticate');

const client = new OAuth2Client("798827553844-i0rjoguupm9jucbohldlp16kthi5boif.apps.googleusercontent.com");


GoogleRouter.post('/googlelogin', async (req, res, next) => {
    const { tokenId } = req.body;
    // console.log(req.body)
    client.verifyIdToken({ idToken: tokenId, audience: "798827553844-i0rjoguupm9jucbohldlp16kthi5boif.apps.googleusercontent.com" })
        .then((response) => {
            const { email_verified, name, email, picture } = response.payload;
            // console.log(response.payload);
            if (email_verified) {
                User.findOne({ email: email })
                .then(async (user) => {
                    if (user) {
                        console.log(user)
                        user.profilePic = picture;
                        user.save();
                        var token = authenticate.getToken({_id: user._id});
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.cookie('session-id', token, { httpOnly: false });
                        res.json({success: true, token: token, user: user , status: 'You are successfully logged in!'});
                        return;
                    }
                    const payload = response.payload;
                    const UserData = {
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        profilePic: payload.picture,
                        email: payload.email,
                        isEmailVerifies: true,
                    }
                    console.log(UserData)
                    User.create(UserData)
                    .then((user) => {
                        console.log("Profile Created")
                        console.log(user)
                        const token = authenticate.getToken({_id: user._id});
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.cookie('session-id', token, { httpOnly: false });
                        res.json({success: true, token: token, user: user , status: 'You are successfully logged in!'});
                    }, (err) => next(err))
                    .catch((err) => next(err));
                    
                }, (err) => next(err))
                .catch((err) => next(err));
            } else {
                res.statusCode = 400
                res.json({err: "Email Not Verified"})
            }
        });
});

module.exports = GoogleRouter;