const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const hashPassword = require('../helpers/HashPassword');


exports.login = async (req, res, next) => {
  try {

    const [rows, fields] = await req.connection.execute('SELECT * from users WHERE `username` = ?', [req.body.username]);
    if (!rows.length) {
      return next(new APIError('Not Found', httpStatus.NOT_FOUND, true));
    } else {
      let user = rows[0];
      if(user.block === 0){
        if (user.password === hashPassword.getHash(req.body.password)) {
          delete user.password;
          const token = jwt.sign(user, config.jwtSecret);
          return res.json({
            token: token
          });
        } else {
          return next(new APIError('Not Found', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('User blocked. Contact administrators -> www.iskynote.com/contacts', httpStatus.UNAUTHORIZED, true));
      }

    }

  } catch (error) {
    next(error);
  }
};

exports.getRandomNumber = (req, res) => {
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
};
