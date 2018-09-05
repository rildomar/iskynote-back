const ApiError = require('../helpers/APIError');
const HashPassword = require('../helpers/HashPassword');

//OK
const create = async (req, res, next) => {
  try {
    req.body.password = HashPassword.getHash(req.body.password);
    req.body.role = req.body.role.toUpperCase();

    const query = `
    INSERT INTO usuario (username, password, block, role, createdAt, updatedAt, person_id, book_id ) VALUES 
    (?,?,?,?,?,?,?,?);
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
    const [rows, fields] = await req.connection.execute(query,data);

    res.json(rowsUser);
  } catch (error) {
    next(error);
  }
};

//OK
const deleteUser = async (req, res, next) => {
  try {
    //req.user.user_id
    const querySearchUser = "SELECT Pessoa_idPessoa FROM users WHERE user_id = ?";
    const dataSearchUser = [req.user.user_id];
    const [rowsSearchUser, fieldsSearchUser] = await req.connection.execute(querySearchUser,dataSearchUser);
    
    const idPessoa = rowsSearchUser[0].Pessoa_idPessoa;
    
    let queryDeleteUser = "DELETE FROM users WHERE user_id = ?";
    let dataDeleteUser = [req.user.user_id];
    const [rowsDeleteUser, fieldsDeleteUser] = await req.connection.execute(queryDeleteUser, dataDeleteUser);
    
    const querySearchPessoa = "SELECT endereco_idendereco FROM pessoa WHERE idPessoa = ?";
    const dataSearchPessoa = [idPessoa];
    const [rowsSearchPessoa, fieldsSearchPessoa] = await req.connection.execute(querySearchPessoa, dataSearchPessoa);

    const idEndereco = rowsSearchPessoa[0].endereco_idendereco;

    let queryDeletePessoa = "DELETE FROM pessoa WHERE idPessoa = ?";
    let dataDeletePessoa = [idPessoa];
    const [rowsDeletePessoa, fieldsDeletePessoa] = await req.connection.execute(queryDeletePessoa, dataDeletePessoa);

    let queryDeleteEndereco = "DELETE FROM endereco WHERE idendereco = ?";
    let dataDeleteEndereco = [idEndereco];
    const [rowsDeleteEndereco, fieldsDeleteEndereco] = await req.connection.execute(queryDeleteEndereco, dataDeleteEndereco);

    res.json(rowsDeleteUser)
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    let query = "UPDATE users as u SET u.block = 1 WHERE u.user_id = ?";
    let data = [req.params.id];



    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
// TODO
const updateUser = async (req, res, next) => {
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
// TODO
const updateUserById = async (req, res, next) => {
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
//OK
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
//OK
const getProfile = async (req, res, next) => {
  console.log('getProfile', req.userL);
  res.json(req.userL);
};
//OK
const list = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT u.user_id, u.username, u.role, u.createdAt FROM users as u');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
//OK
const findById = async (req, res, next) => {
  try {
    const query = 'SELECT u.user_id, u.username, p.name,  p.email, p.celphone, u.createdAt, u.role FROM users as u INNER JOIN pessoa as p ON u.Pessoa_idPessoa = p.idPessoa where u.user_id=?';
    const [rows, fields] = await req.connection.execute(query, [req.params.id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
//OK
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
  create: create
};