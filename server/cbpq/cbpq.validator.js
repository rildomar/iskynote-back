const Joi = require('joi');

module.exports = {
  cbpqField: {
    query: {
      cbpq: Joi.number().required()
    }
  }
};
