const express = require('express');
const expressJwt = require('express-jwt');
const validate = require('express-validation');
const cbpqCtrl = require('./cbpq.controller');
const config = require('../../config/config');
const paramValidation = require('./cbpq.validator');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

//router.route('/')
//  .get(expressJwt(secret), validate(paramValidation.cbpqField), cbpqCtrl.cbpqData);

router.route('/')
  .get(cbpqCtrl.cbpqData, cbpqCtrl.updateCbpqData, cbpqCtrl.createPersonData);

module.exports = router;

