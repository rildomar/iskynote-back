const ApiError = require('../helpers/APIError');
const HashPassword = require('../helpers/HashPassword');

const create = async (req, res, next) => {
  try {
    req.body.password = HashPassword.getHash(req.body.password);
    req.body.role = req.body.role.toUpperCase();

    const query = `
    INSERT INTO usuario (username,password,block,role,createdAt,updatedAt,person_id,book_id) VALUES (?,?,?,?,?,?,?,?);
    `;
    const data = [
      req.body.username,
      req.body.password,
      req.body.block,
      req.body.role,
      new Date(),
      new Date(),
      res.personObj.insertId,
      0
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(create);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    let query = "DELETE FROM users WHERE user_id = ?";
    let data = [req.params.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows)
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    let query = "";
    let data = [];
    if (req.body.password) {
      req.body.password = HashPassword.getHash(req.body.password);
      query = "UPDATE users SET name = ?, email = ?, password = ?, login = ?, blocked = ?, updatedAt = ? WHERE id = ?";
      data = [req.body.name, req.body.email, req.body.password, req.body.login, false, new Date(), req.user.id];
    } else {
      query = "UPDATE users SET name = ?, email = ?, login = ?, blocked = ?, updatedAt = ? WHERE id = ?";
      data = [req.body.name, req.body.email, req.body.login, false, new Date(), req.user.id];
    }
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const load = async (req, res, next) => {
  try {
    const query = 'SELECT u.user_id, u.username, p.name,  p.email, p.celphone, u.createdAt, u.role FROM users as u INNER JOIN pessoa as p ON u.Pessoa_idPessoa = p.idPessoa where u.user_id=?';
    const [rows, fields] = await req.connection.execute(query, [req.user.user_id]);
    const user = rows[0];
    if (!user) {
      return next(new ApiError('Not Found', 404));
    } else {
      req.userL = user;
      return next();
    }
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  res.json(req.userL);
};

const changePasswordUserLogged = async (req, res, next) => {
  try {
    let query = "";
    let data = [];
    if (req.body.password) {
      req.body.password = HashPassword.getHash(req.body.password);
      query = "SELECT password FROM users WHERE user_id = ?";
      data = [req.user.user_id];
      const [rows, fields] = await req.connection.execute(query, data);
      if (req.body.password === rows[0].password) {
        req.body.newPassword = HashPassword.getHash(req.body.newPassword);
        query = "UPDATE users SET password = ? WHERE user_id = ?";
        data = [req.body.newPassword, req.user.user_id];
        const [rowsup, fieldsup] = await req.connection.execute(query, data);

        res.json(rowsup)
      } else {
        res.status(400).send({
          error: 'Wrong password.'
        });
      }
    } // end-if-pw
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create: create,
  delete: remove,
  update: update,
  load: load,
  getProfile: getProfile,
  changePasswordUserLogged: changePasswordUserLogged
};