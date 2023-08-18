const { authJwt } = require("../middleware");
const { subscription } = require("../controller");
const express = require('express')
const router = express.Router();


router.route('/get-product').get(authJwt.verifyToken, subscription.getProducts);
router.route('/get-user-subs/:userId').get(authJwt.verifyToken, subscription.getUserSubscriptions);
router.route('/create-session').post(authJwt.verifyToken, subscription.createStripeSession);
router.route('/update-subs').put(authJwt.verifyToken, subscription.upgradeSubscriptions);
router.route('/cancel-subs').post(authJwt.verifyToken, subscription.cancelSubscription);


module.exports = router