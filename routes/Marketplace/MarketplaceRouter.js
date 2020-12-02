const express = require('express');
const passport = require('passport');

const authenticate = require('../../authenticate');
const Marketplace = require('./Marketplace');

const MarketplaceRouter = express.Router();

MarketplaceRouter.route('/Marketplace')
.get(Marketplace.get)
.post( Marketplace.post)
.put( Marketplace.put)
.delete( Marketplace.delete)

// MarketplaceRouter.route('/discussion')
// .get(discussion.get)
// .post(authenticate.verifyUser, discussion.post)
// .put(authenticate.verifyUser, discussion.put)
// .delete(authenticate.verifyUser, discussion.delete)


module.exports = MarketplaceRouter;