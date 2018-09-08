const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('../../config/config');

const paramValidation = require('./user.validator');
const routerGuard = require('../helpers/RouterGuard');

const personRoutes = require('./../person/person.route');
const equipmentRoutes = require('./../equipment/equipment.route');
const addressRoutes = require('./../address/address.route');
const logBookRoutes = require('./../logBook/logBook.route');
const jumpRoutes = require('./../jump/jump.route');
const categoryRoutes = require('./../category/category.route');

const userCtrl = require('./user.controller');
const personCtrl = require('./../person/person.controller');
const logBookCtrl = require('./../logBook/logBook.controller');
const jumpCtrl = require('./../jump/jump.controller');
const categoryCtrl = require('./../category/category.controller');


const secret = {
  secret: config.jwtSecret
};

router.use('/person', personRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/address', addressRoutes);
router.use('/logbook', logBookRoutes);
router.use('/jump', jumpRoutes);
router.use('/category', categoryRoutes);

router.route('/')
  .post(personCtrl.create, logBookCtrl.create, categoryCtrl.create, userCtrl.create, );

router.route('/:id')
  .get(userCtrl.load, userCtrl.getProfile)
  .put(userCtrl.update)
  .delete(userCtrl.delete);

module.exports = router;
