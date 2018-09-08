const _ = require('lodash');

const create = async (req, res, next) => {
  try {
    const query = `
    INSERT INTO category (category, category_date, instructor_name, licence_number, observation, book_id, createdAt) VALUES (?,?,?,?,?,?,?);
    `;
    const data = [
      req.category.cat, 
      req.category.date_cat,
      req.category.instructor_name, 
      req.category.license_number, 
      req.category.desc, 
      req.logBookObj.insertId, 
      new Date()]
    const [rows, fields] = await req.connection.execute(query, data);
    res.categoryObj = rows;
    return next();
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => { res.json(res.categoryObj) };

const update = async (req, res, next) => {
  try {
    const query = `
    UPDATE category SET
    category = ?,
    category_date = ?,
    instructor_name = ?,
    licence_number = ?,
    observation = ?,
    book_id = ?,
    WHERE category_id = ?;
    `;
    const data = [
      req.category.cat, 
      req.category.date_cat,
      req.category.instructor_name, 
      req.category.license_number, 
      req.category.desc,
      req.params.id
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const fetchByLogBookId = async (req, res, next) => {
  try {
    const query = `
      SELECT * FROM category WHERE book_id = ?
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
      DELETE FROM category
      WHERE category_id = ?;
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
  fetchByLogBookId: fetchByLogBookId
};
