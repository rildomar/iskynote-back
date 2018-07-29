const Joi = require('joi');

module.exports = {
  powerFactor: {
    query: {
      b1: Joi.string().required(),
      b2: Joi.string().required(),
      b3: Joi.string().required()
    }
  }
};
