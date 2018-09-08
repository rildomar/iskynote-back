const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const personCtrl = require('./person.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .get(personCtrl.list)
  .post(personCtrl.create, personCtrl.created);

router.route('/:id')
  .get(personCtrl.getById)
  .put(personCtrl.update)
  .delete(personCtrl.delete);

module.exports = router;
