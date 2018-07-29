const express = require('express');
const userRoutes = require('./server/user/user.route');
const weatherRoutes = require('./server/weather/weather.route');
const chartsRoutes = require('./server/charts/charts.route');
const authRoutes = require('./server/auth/auth.route');
const b1Routes = require('./server/b1/b1.route');
const settingsRoutes = require('./server/settings/settings.route.js');
const swaggerDoc = require('./config/swagger');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /users
router.use('/charts', chartsRoutes);

// mount user routes at /weather
router.use('/weather', weatherRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount documentation routes at /docs
router.use('/docs', swaggerDoc());

router.use('/b1', b1Routes);

router.use('/settings', settingsRoutes);

module.exports = router;
