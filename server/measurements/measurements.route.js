const express = require('express');
const expressJwt = require('express-jwt');
const validate = require('express-validation');
const measurementsCtrl = require('./measurements.controller');
const config = require('../../config/config');
const measurementsValidator = require('./measurements.validator');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .get(measurementsCtrl.list);

router.route('/powerfactor')
  .get(validate(measurementsValidator.powerFactor), measurementsCtrl.powerFactorData);


module.exports = router;
