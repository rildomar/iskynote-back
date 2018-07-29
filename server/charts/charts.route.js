const express = require('express');
// const expressJwt = require('express-jwt');
// const validate = require('express-validation');
const areaChartCtrl = require('./area/area.controller');
const lineChartCtrl = require('./line/line.controller');
// const chartsValidator = require('./charts.validator');
// const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

// const secret = {
//   secret: config.jwtSecret
// };

router.route('/area')
  .get(areaChartCtrl.loadData);


router.route('/line')
  .get(lineChartCtrl.loadData);

module.exports = router;
