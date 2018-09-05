const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const addressCtrl = require('./address.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(addressCtrl.create, addressCtrl.created);


module.exports = router;
