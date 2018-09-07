const _ = require('lodash');

const create = async (req, res, next) => {
  try {
    const query = `
        INSERT INTO pessoa
        (name, email, celphone, cbpq, site_cbpq, uspa, site_uspa, createdAt, updatedAt, height, weight, type_of_blood) VALUES
        (?,?,?,?,?,?,?,?,?,?,?);
      `;
    const data = [
      req.body.pessoa.name,
      req.body.pessoa.email,
      req.body.pessoa.celphone,
      req.body.pessoa.cbpq,
      req.body.pessoa.site_cbpq,
      req.body.pessoa.uspa,
      req.body.pessoa.site_uspa,
      new Date(),
      new Date(),
      req.body.pessoa.height,
      req.body.pessoa.weight,
      req.body.pessoa.typeOfBlood
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    req.personObj = rows.insertId;
    return next()
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => {
  res.json(req.personObj);
};

const update = async (req, res, next) => {
  try {
    const query = `
        INSERT INTO pessoa
        (name, email, celphone, cbpq, site_cbpq, uspa, site_uspa, createdAt, updatedAt, height, weight, type_of_blood) VALUES
        (?,?,?,?,?,?,?,?,?,?,?);
      `;
    const data = [
      req.body.pessoa.name,
      req.body.pessoa.email,
      req.body.pessoa.celphone,
      req.body.pessoa.cbpq,
      req.body.pessoa.site_cbpq,
      req.body.pessoa.uspa,
      req.body.pessoa.site_uspa,
      new Date(),
      new Date(),
      req.body.pessoa.height,
      req.body.pessoa.weight,
      req.body.pessoa.typeOfBlood
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    let query = `
      DELETE FROM pessoa
      WHERE pessoa_id = ?;
    `;
    let data = [req.params.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res, next) => {
  try {
    let query = `
      SELECT * FROM pessoa WHERE person_id = ?
    `;
    let data = [req.query.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows)
  } catch (error) {
    next(error);
  };
};

const fetchAll = async (req, res, next) => {
  try {
    let query = `
      SELECT * FROM pessoa;
    `;
    const [rows, fields] = await req.connection.execute(query);
    res.json(rows)
  } catch (error) {
    next(error);
  };
};

module.exports = {
  create: create,
  created: created,
  update: update,
  delete: remove,
  getById: getPersonById,
  list: fetchAll
};
