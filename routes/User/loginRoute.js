const express = require('express');
const router = express.Router();
const User = require('../../Models/UserNewModel');

router.post('/loginUser', async (req, res, next) => {
    console.log(req.body);
    
});

module.exports = router;