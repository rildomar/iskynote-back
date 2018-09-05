const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const paramValidation = require('./user.validator');
const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const equipmentCtrl = require('./equipment.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(equipmentCtrl.create, equipmentCtrl.created);

router.route('/:id')
  .get(equipmentCtrl.find)
  .put(equipmentCtrl.update)
  .delete(equipmentCtrl.delete);

module.exports = router;
