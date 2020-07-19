const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');

router.put('/ideasubmit', async (req, res) => {
    console.log(req.body);
    const ideaget = "(Topic: " + req.body.topic + ") " + "(Description: " + req.body.briefIdea + ")";
    const user = await User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                user.phone = req.body.phone;
                user.ideagiven = ideares;
                user.idea =  ideaget;
                user.friend1 = req.body.f1email;
                user.friend2 = req.body.f2email;
                user.sector = req.body.sector;
                user.name = user.name;
                user.email = user.email;
                user.picture = user.picture;
                const updateduser = await user.save();
                res.send({
                    _id: updateduser.id,
                    name: updateduser.name,
                    email: updateduser.email,
                    picture: updateduser.picture,
                    phone: updateduser.picture,
                    ideagiven: updateduser.ideagiven,
                    idea: updateduser.idea,
                    friend1: updateduser.friend1,
                    friend2: updateduser.friend2,
                    friend3: updateduser.friend3,
                    sector: updateduser.sector
                });
                res.status(200).send({msg: 'Your Idea is Successfully Submitted, our team will contact your Soon!' })
                console.log(user.email);
            } else {
                res.status(404).send({msg: 'Please Log In'});
            }
        }
    });
});

module.exports = router;