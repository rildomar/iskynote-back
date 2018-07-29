const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const hashPassword = require('../helpers/HashPassword');

module.exports.getB2ByB1 = async (req, res, next) => {

  try {
    const [rows, fields] = await req.connection.execute('SELECT b2.id, b2_name, b2_label FROM b2,b1 WHERE b1.id=b2.b1_id AND (b1.b1_label=? OR b1.id=?)', [req.params.b1, req.params.b1])
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports.getB3ByB2 = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT b3.id, b3_name, b3_label FROM b3,b2 WHERE b2.id =b3.b2_id AND (b2.b2_label=? OR b2.id=?)', [req.params.b2, req.params.b2])
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
