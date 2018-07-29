const Joi = require('joi');

module.exports = {
  weatherFields: {
    query: {
      city: Joi.string().required(),
      uf: Joi.string().required(),
      unity: Joi.string().required()
    }
  }
};
