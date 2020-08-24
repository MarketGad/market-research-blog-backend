const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

const client = new OAuth2Client("798827553844-i0rjoguupm9jucbohldlp16kthi5boif.apps.googleusercontent.com");


router.post('/googlelogin', async (req, res, next) => {
    const { tokenId } = req.body;
    console.log(req.body)
    client.verifyIdToken({ idToken: tokenId, audience: "798827553844-i0rjoguupm9jucbohldlp16kthi5boif.apps.googleusercontent.com" })
        .then((response) => {
            const { email_verified, name, email, picture } = response.payload;
            console.log(response.payload);
            if (email_verified) {
                console.log("1");
                User.findOne({ email }).exec(async (err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Somethig went wrong..."
                        })
                    } else {
                        console.log("2");
                        if (user) {
                            console.log("3");
                            const token = jwt.sign({ _id: user._id }, config.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                            const { _id, name, email, picture, phone, ideagiven, idea, friend1, friend2, friend3, sector } = user;
                            res.json({
                                token,
                                user: { _id, name, email, picture, phone, ideagiven, idea, friend1, friend2, friend3, sector }
                            })
                        } else {
                            console.log("4");
                            const newUser = new User({
                                name: response.payload.name,
                                email: response.payload.email,
                                picture: response.payload.picture,
                            });
                            const saveduser = await newUser.save();
                            console.log(saveduser);
                            // if (err) {
                            //     console.log("5");
                            //     res.status(401).json({
                            //         error: "Something went wong..."
                            //     })
                            // }
                            const token = jwt.sign({ email: saveduser.email }, config.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                            const { _id, name, email, picture, phone, ideagiven, idea, friend1, friend2, friend3, sector } = saveduser;
                            res.json({
                                token,
                                user: { _id, name, email, picture, phone, ideagiven, idea, friend1, friend2, friend3, sector }
                            })

                        }
                    }
                });
            }
        });
});

module.exports = router;