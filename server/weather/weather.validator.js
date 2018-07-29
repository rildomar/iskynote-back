const Joi = require('joi');

module.exports = {
  weatherFields: {
    query: {
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }
  }
};
