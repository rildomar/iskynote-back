const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const paramValidation = require('./user.validator');
const userCtrl = require('./user.controller');
const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .get(expressJwt(secret), routerGuard.checkPermission(['ADMIN']), userCtrl.load, userCtrl.list)
  .post(validate(paramValidation.createUser), userCtrl.createUser)
  .put(expressJwt(secret), userCtrl.load, userCtrl.updateUser)
  .delete(expressJwt(secret), userCtrl.deleteUser);

router.route('/profile')
  .get(expressJwt(secret), userCtrl.load, userCtrl.getProfile);

router.route('/:id')
  .get(expressJwt(secret), routerGuard.checkPermission(['ADMIN']), userCtrl.load, userCtrl.findById)
  .put(expressJwt(secret), routerGuard.checkPermission(['ADMIN']), userCtrl.load, userCtrl.updateUserById)
  .delete(expressJwt(secret), routerGuard.checkPermission(['ADMIN']), userCtrl.load, userCtrl.deleteUserById);


module.exports = router;
