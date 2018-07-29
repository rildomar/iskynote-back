var express = require('express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const router = express.Router();

module.exports = () => {

  let swaggerDefinition = {
    info: {
      title: 'iSkynote server',
      version: '0.0.1',
      description: '',
    },
    host: process.env.HOST || 'localhost:3000',
    basePath: '/api',
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header',
      },
    }
  };

  let options = {
    swaggerDefinition: swaggerDefinition,
    apis: [__dirname + '/../server/**/*.js'],
  };

  let swaggerSpec = swaggerJSDoc(options);

  router.get('/swagger', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const showExplorer = false;
  const opt = {};
  const customCss = '.topbar{display:none}';
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, showExplorer, opt, customCss));
  return router;
};
