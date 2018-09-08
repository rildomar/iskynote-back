const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const jumpCtrl = require('./jump.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(jumpCtrl.create, jumpCtrl.created);

router.route('/:id')
  .put(jumpCtrl.update)
  .delete(jumpCtrl.delete);

module.exports = router;
