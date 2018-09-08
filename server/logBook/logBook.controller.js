const _ = require('lodash');

const create = async (req, res, next) => {
  try {
    const query = `
    INSERT INTO caderneta (federacao, total_delay, createdAt, updatedAt) VALUES (?,?,?,?);
    `;
    const data = [req.logbook.federation, req.logbook.total_delay, new Date(), new Date()]
    const [rows, fields] = await req.connection.execute(query, data);
    res.logBookObj = rows;
    return next();
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => { res.json(res.logBookObj) };

const update = async (req, res, next) => {
  try {
    const query = `
    UPDATE caderneta
    SET
    federacao = ?,
    total_delay = ?,
    updatedAt = ?
    WHERE book_id = ?;
    `;
    const data = [
      req.logbook.federation,
      req.logbook.total_delay,
      new Date(),
      req.params.id
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const fetchAll = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM caderneta
    `;
    const data = [req.params.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const query = `
      DELETE FROM caderneta
      WHERE book_id = ?;
    `;
    const data = [req.params.id]
    const [rows, fields] = await req.connection.execute(query, data);
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
  fetchAll: fetchAll
};
