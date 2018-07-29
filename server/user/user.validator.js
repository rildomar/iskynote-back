const Joi = require('joi');
const permissions = require('../helpers/RouterGuard').permissions();

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
      login: Joi.string().alphanum().min(3).max(30)
        .required(),
      role: Joi.string().valid(permissions).required()
    }
  },
  updateUser: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      login: Joi.string().alphanum().required().min(3).max(30)
    }
  },
  changePasswordUserLogged: {
    body: {
      password: Joi.string().required(),
      newPassword: Joi.string().required()
    }
  }
};
