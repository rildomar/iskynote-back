const ApiError = require('../helpers/APIError');
const HashPassword = require('../helpers/HashPassword');

exports.createUser = async (req, res, next) => {
  try {
    req.body.password = HashPassword.getHash(req.body.password);
    req.body.role = req.body.role.toUpperCase();

    const [rowsp, fieldsp] = await req.connection.execute(
      'INSERT INTO pessoa (name, email, createdAt, updatedAt) VALUES (?,?,?,?)', 
      [req.body.name,req.body.email, new Date(), new Date()]
    )
    console.log("Pessoa id -> ", rowsp.insertId)
    const [rows, fields] = await req.connection.execute(
      'INSERT INTO users (password, role, username, block, createdAt, updatedAt, Pessoa_idPessoa) VALUES(?,?,?,?,?,?,?)', [req.body.password, req.body.role, req.body.username, false, new Date(), new Date(), rowsp.insertId]);
    
      console.log("User id ->", rows.insertId)
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let query = "DELETE FROM users WHERE id = ?";
    let data = [req.user.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try{
    let query = "DELETE FROM users where id = ?";
    let data = [req.params.id];

    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    req.body.role = req.body.role.toUpperCase();

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

exports.updateUserById = async (req, res, next) => {
  try {
    req.body.role = req.body.role.toUpperCase();

    let query = "";
    let data = [];
    if (req.body.password) {
      req.body.password = HashPassword.getHash(req.body.password);
      query = "UPDATE users SET name = ?, email = ?, password = ?, login = ?, role = ?, blocked = ?, updatedAt = ? WHERE id = ?";
      data = [req.body.name, req.body.email, req.body.password, req.body.login, req.body.role, false, new Date(), req.params.id];
    } else {
      query = "UPDATE users SET name = ?, email = ?, login = ?, role = ?, blocked = ?, updatedAt = ? WHERE id = ?";
      data = [req.body.name, req.body.email, req.body.login, req.body.role, false, new Date(), req.params.id];
    }

    const [rows, fields] = await req.connection.execute(query, data);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
};

exports.load = async (req, res, next) => {

  try {
    const [rows, fields] = await req.connection.execute('SELECT u.id, u.name, u.email, u.login, u.role FROM users u WHERE id=?', [req.user.id]);
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

exports.getProfile = async (req, res, next) => {
  res.json(req.userL);
};

exports.list = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT u.id, u.name, u.email, u.login, u.role FROM users u');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute("SELECT u.id, u.name, u.email, u.login, u.role FROM users u WHERE id=?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
