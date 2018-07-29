const express = require('express');
const expressJwt = require('express-jwt');
const settingsCtrl = require('./settings.controller');
const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/userb1')
  .post(expressJwt(secret), routerGuard.checkPermission(['ADMIN']), settingsCtrl.lookUpUser, settingsCtrl.lookUpB1, settingsCtrl.userb1);

router.route('/charts')
  .get(expressJwt(secret), settingsCtrl.listConfig);

router.route('/')
  .post(expressJwt(secret), settingsCtrl.createConfig);

router.route('/:id')
  .put(expressJwt(secret), settingsCtrl.lookUpConfig, settingsCtrl.updateConfig);

module.exports = router;
