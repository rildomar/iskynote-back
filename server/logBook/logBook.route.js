const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const logBookCtrl = require('./logBook.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(logBookCtrl.create, logBookCtrl.created);

router.route('/:id')
  .put(logBookCtrl.update)
  .delete(logBookCtrl.delete);

module.exports = router;
