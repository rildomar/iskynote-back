const Joi = require('joi');

module.exports = {
  login: {
    body: {
      login: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
