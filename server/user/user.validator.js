const Joi = require('joi');
const permissions = require('../helpers/RouterGuard').permissions();

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      password: Joi.string().required(),
      username: Joi.string().alphanum().min(3).max(30)
        .required(),
      role: Joi.string().valid(permissions).required()
    }
  },
};
