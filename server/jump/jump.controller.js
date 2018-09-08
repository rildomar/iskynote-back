const _ = require('lodash');

const create = async (req, res, next) => {
  try {
    const query = `
    INSERT INTO salto (
      jump_number, jump_date, jump_type, jump_height, jump_delay, jump_desc, jump_airplane, createdAt, updateAt, book_id, file_id) VALUES
      (?,?,?,?,?,?,?,?,?,?,?);
    `;
    const data = [
      req.jump.number,
      req.jump.date_jumped,
      req.jump.type_jump,
      req.jump.height,
      req.jump.delay,
      req.jump.desc,
      req.jump.airplane,
      new Date(),
      new Date(),
      res.logBookObj.insertId,
      0
      
    ]
    const [rows, fields] = await req.connection.execute(query, data);
    res.jumpObj = rows;
    return next();
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => { res.json(res.jumpObj) };

const update = async (req, res, next) => {
  try {
    const query = `
    UPDATE salto SET
    jump_number = ?,
    jump_date = ?,
    jump_type = ?,
    jump_height = ?,
    jump_delay = ?,
    jump_desc = ?,
    jump_airplane = ?,
    updateAt = ?,
    WHERE jump_id = ?;
    `;
    const data = [
      req.jump.number,
      req.jump.date_jumped,
      req.jump.type_jump,
      req.jump.height,
      req.jump.delay,
      req.jump.desc,
      req.jump.airplane,
      new Date(),
      req.params.id
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const fetchAllByLogBookId = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM salto WHERE book_id = ?
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
  fetchAllByLogBookId: fetchAllByLogBookId
};
