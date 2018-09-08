const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');

const config = require('../../config/config');
const routerGuard = require('../helpers/RouterGuard');

const categoryCtrl = require('./category.controller');

const router = express.Router(); // eslint-disable-line new-cap

const secret = {
  secret: config.jwtSecret
};

router.route('/')
  .post(categoryCtrl.create, categoryCtrl.created);

router.route('/:id')
  .put(categoryCtrl.update)
  .delete(categoryCtrl.delete);

router.route('/logbook/:id')
  .post(categoryCtrl.fetchByLogBookId);

module.exports = router;
