const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('../../config/config');

const paramValidation = require('./user.validator');
const routerGuard = require('../helpers/RouterGuard');

const userCtrl = require('./user.controller');
const addressCtrl = require('./../address/address.controller');
const personCtrl = require('./../person/person.controller');

const addressRoutes = require('./../address/address.route')

const secret = {
  secret: config.jwtSecret
};
//Falta terminar
router.route('/')
  .post(personCtrl.create ,userCtrl.create);

router.use('/address', addressRoutes);

module.exports = router;
