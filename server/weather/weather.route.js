const express = require('express');
const expressJwt = require('express-jwt');
const validate = require('express-validation');
const weatherCtrl = require('./weather.controller');
const config = require('../../config/config');
const paramValidation = require('./weather.validator');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .get(expressJwt(secret), validate(paramValidation.weatherFields), weatherCtrl.weatherData);

module.exports = router;

