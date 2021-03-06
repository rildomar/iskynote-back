const _ = require('lodash');
const db = require('../../config/mysql');

const create = async (req, res, next) => {
  try{
    const query = 'INSERT INTO endereco (address, city, state ) VALUES (?,?,?)';
    const data = [req.body.pessoa.endereco.address, req.body.pessoa.endereco.city, req.body.pessoa.endereco.state]
    const [rows, fields] = await db.execute(query, data);
    req.addressObj = rows;
    return next();
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => {
  res.json(req.addressObj);
};

const update = async (req, res, next) => {
  try{
    return res.json({value: "Update"});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try{
    const query = `
      DELETE FROM endereco
      WHERE address_id = ?;
    `;
    const data = [req.params.id]
    const [rows, fields] = await db.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try{
    console.log(req);
    const query = `
      SELECT * FROM endereco;
    `;
    //const data = [req.params.id]
    const [rows, fields] = await db.execute(query);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create: create,
  created: created,
  update: update,
  delete: remove,
  getAll: getAll
};
