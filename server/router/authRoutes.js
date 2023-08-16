const express = require('express');
const { auth } = require('../controller')
const router = express.Router();

router.route('/register').post(auth.register);
router.route('/login').post(auth.login);

module.exports = router;