const express = require('express');
const bodyParser = require('body-parser');
var {cloudinary} = require('../../utils/cloudinary');
var passport = require('passport');


var authenticate = require('../../authenticate');
const config = require('../../config');
const shuffle = require('../../utils/shuffle')
// SCHEMA
const User = require('../../Models/UserNewModel');
const ProductDetails = require('../../Models/ProductDetails');
const JobProfile = require('../../Models/JobProfile');


const sortByProperty =  require('../../utils/sortByProperty')
const productDetailsRouter = express.Router();


// cloudinary.config({ 
//     cloud_name: config.CLOUDINARY_CLOUD_NAME, 
//     api_key: config.CLOUDINARY_API_KEY, 
//     api_secret: config.CLOUDINARY_API_SECRET, 
// });

// PART 1


productDetailsRouter.route('/')
.get((req, res, next) => {
    ProductDetails.find({})
    .sort({upvotes: -1})
    .populate('comments.author')
    .populate('user')
    .then((profiles) => {
        // sort by reputation
        if(profiles){
            // profiles.sort(sortByProperty("upvotes"))
            // sort the "product profiles" here based on reputation point
            // shuffle(profiles)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({profiles: [], err: "No Products Availaible"})
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, async (req, res, next) => {
    req.body.user = req.user._id
    req.body.upvotesList = [req.user._id]
    req.body.upvotes = 1
    console.log("uploading to cloudinary")
    if(req.body.logo){
        await cloudinary.uploader.upload(req.body.logo, 
            {   
                folder: "Product_Profiles/logo/", 
                public_id: req.body.name+" "+req.user._id,
                quality: "auto:low"
            },
            (error, result) => {
                // console.log(result, error)
                req.body.logo = result.secure_url;
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    console.log("creating")
    ProductDetails.create(req.body)
    .then((profile) => {
        console.log('Profile Created ');
        res.json(profile);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not supported yet');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('delete operation not supported yet');
})


// PART 2 


productDetailsRouter.route('/:productID')
.get((req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .populate('comments.author')
    .populate('user')
    .then(async (product)=> {
        product.reputationPoint = 4 * product.comments.length + product.upvotes
        await product.save()
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products/' + req.params.productID);
})
.put( authenticate.verifyUser,  (req, res, next) => {
    ProductDetails.findByIdAndUpdate(req.params.productID, {
        $set: req.body
    }, { new: true})
    .then(async (product) => {
        product.reputationPoint = 4 * product.comments.length + product.upvotes
        await product.save()
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( authenticate.verifyUser, (req, res, next) => {
    ProductDetails.findByIdAndRemove(req.params.productID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// COMMENTS  PART 3

productDetailsRouter.route('/:productID/comments')
.get((req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .populate('comments.author')
    .then((product)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product.comments)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post( authenticate.verifyUser,  (req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .then(async (product) => {
        if(product != null){
            req.body.author = req.user._id; 
            product.comments.push(req.body);
            await product.save()
            .then(async (product) => {
                ProductDetails.findById(product._id)
                    .populate('comments.author')
                    .then(async(product) => {
                        product.reputationPoint = 4 * product.comments.length + product.upvotes
                        await product.save()
                        User.findById(req.user._id)
                            .then(async (user) => {
                                user.reputation = user.reputation + 4;
                                await user.save();
                            })
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(product.comments);
                    })    
            }, (err) => next(err));
        }else{
            err = new Error(' Product '+ req.params.productID+' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( authenticate.verifyUser,  (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /productdetails"
    + req.params.productID+"/comments");
})
.delete( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /productdetails"
    + req.params.productID+"/comments");
});

// PART 4

productDetailsRouter.route('/:productID/comments/:commentID')
.get((req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .then((product) => {
        if(product != null && product.comments.id(req.params.commentID) != null ){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product.comments.id(req.params.commentID))
        } else if(product == null ) {
            err = new Error(' product '+ req.params.productID+' not found.');
            err.status = 404;
            return  next(err);
        } else {
            err = new Error(' Product '+ req.params.productID+' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /product/' 
            + req.params.productID+'/comments/'
            +req.params.commentID+' not found');
})
.put( authenticate.verifyUser, (req, res, next) => {
    ProductDetails.findById(req.params.productID)
        .then(async (product) => {
            // console.log(product)
            if(!product.comments.id(req.params.commentID).author.equals(req.user._id) ){
                err = new Error(' You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
            else if(product != null && product.comments.id(req.params.commentID )!= null ){
                if(req.body.rating){
                    product.comments.id(req.params.commentID).rating = req.body.rating;
                }
                if(req.body.comment){
                    product.comments.id(req.params.commentID).comment = req.body.comment;
                }
                await product.save()
                    .then((product) => {
                        ProductDetails.findById(product._id)
                            .populate('comments.author')
                            .then((product) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(product.comments);
                            })
                    }, (err) => next(err));

            }else if(product == null){
                err = new Error(' Product '+ req.params.productID+' not found.');
                err.status = 404;
                return next(err);
            }else{
                err = new Error(' Comment '+ req.params.commentID+' not found.');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete( authenticate.verifyUser, (req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .then((product) => {
        // console.log(product.comments.id(req.params.commentID).author +"  "+ req.user._id );
        if(!product.comments.id(req.params.commentID).author.equals(req.user._id) ){
            err = new Error(' You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        else if(product != null && product.comments.id(req.params.commentID  )!= null ){
            product.comments.id(req.params.commentID ).remove();
            product.save()
            .then(async (product) => {
                ProductDetails.findById(product._id)
                    .populate('comments.author')
                        .then(async(product) => {
                            product.reputationPoint = 4 * product.comments.length + product.upvotes
                            await product.save()
                            User.findById(req.user._id)
                            .then(async (user) => {
                                user.reputation = Math.max(0, user.reputation - 4);
                                await user.save();
                            })
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(product.comments);
                        })
            }, (err) => next(err));

        }else if(product == null){
            err = new Error(' product ' + req.params.productID + ' not found.');
            err.status = 404;
            return next(err);
        }else{
            err = new Error(' Comment '+ req.params.commentID+' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


productDetailsRouter.route('/:productID/upvotes/add')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported yet');
})
.post(authenticate.verifyUser, async (req, res, next) => {
    ProductDetails.findById(req.params.productID)
    .then(async ( product) => {
        if( product != null){
            // console.log(product.upvotesList.indexOf(req.user._id))
            if(product.upvotesList.indexOf(req.user._id) >= 0){
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.json({success: false, message: "already upvoted"})
            } else {
                product.upvotesList.push(req.user._id)
                product.upvotes = product.upvotesList.length;
                product.reputationPoint = 4 * product.comments.length + product.upvotes
                await product.save()
                User.findById(req.user._id)
                .then(async (user) => {
                    if(user){
                        // console.log(user)
                        user.reputation = user.reputation + 1;
                        await user.save();
                    }
                }, (err) => next(err))
                .catch((err) => next(err));

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({success: true, message: "upvote added"})
            }
        } else {
            err = new Error(' Product '+ req.params.productID+' not found.');
            err.status = 404;
            return next(err);
        }
    })
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported');
})

module.exports = productDetailsRouter;