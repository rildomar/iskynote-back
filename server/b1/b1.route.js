const express = require('express');
const expressJwt = require('express-jwt');
const b1Ctrl = require('./b1.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/:b1/b2')
  .get(expressJwt(secret), b1Ctrl.getB2ByB1);

router.route('/b2/:b2/b3')
  .get(expressJwt(secret), b1Ctrl.getB3ByB2);

module.exports = router;
