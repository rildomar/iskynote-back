const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('../../config/config');

const paramValidation = require('./user.validator');
const routerGuard = require('../helpers/RouterGuard');

const userCtrl = require('./user.controller');


const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(userCtrl.create);

router.route('/:id')
  .get(userCtrl.load, userCtrl.getProfile)
  .put(userCtrl.update)
  .delete(userCtrl.delete);

module.exports = router;
