const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('./auth.validator');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

router.route('/random-number')
  .get(expressJwt(secret), authCtrl.getRandomNumber);

module.exports = router;
