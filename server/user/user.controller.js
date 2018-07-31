const ApiError = require('../helpers/APIError');
const HashPassword = require('../helpers/HashPassword');

//OK
exports.createUser = async (req, res, next) => {
  try {
    req.body.password = HashPassword.getHash(req.body.password);
    req.body.role = req.body.role.toUpperCase();

    //#### Cadastrar Endereco
    const queryEndereco = 'INSERT INTO endereco (address, city, state ) VALUES (?,?,?)';
    console.log(queryEndereco)
    const dataEndereco = [req.body.pessoa.endereco.address, req.body.pessoa.endereco.city, req.body.pessoa.endereco.state]
    const [rowsEndereco, fieldsEndereco] = await req.connection.execute(queryEndereco, dataEndereco);

    //#### Cadastrar Pessoa
    const queryPerson = 'INSERT INTO pessoa (name,email,celphone,cbpq,site_cbpq,uspa,site_uspa,createdAt,updatedAt,height,weight,type_of_blood,endereco_idendereco) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const dataPerson = [
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
      req.body.pessoa.typeOfBlood,
      rowsEndereco.insertId
    ]
    const [rowsPerson, fieldsPerson] = await req.connection.execute(queryPerson, dataPerson);

    //#### Cadastrar User 
    const query = 'INSERT INTO users (username, password, createdAt, updatedAt, block, role, Pessoa_idPessoa) VALUES(?,?,?,?,?,?,?)';
    const data = [req.body.username, req.body.password, new Date(), new Date(), false, req.body.role, rowsPerson.insertId];
    const [rowsUser, fieldsUser] = await req.connection.execute(query,data);

    res.json(rowsUser);
  } catch (error) {
    next(error);
  }
};

//OK
exports.deleteUser = async (req, res, next) => {
  try {
    //req.user.idUser_sky
    const querySearchUser = "SELECT Pessoa_idPessoa FROM users WHERE idUser_sky = ?";
    const dataSearchUser = [req.user.idUser_sky];
    const [rowsSearchUser, fieldsSearchUser] = await req.connection.execute(querySearchUser,dataSearchUser);
    
    const idPessoa = rowsSearchUser[0].Pessoa_idPessoa;
    
    let queryDeleteUser = "DELETE FROM users WHERE idUser_sky = ?";
    let dataDeleteUser = [req.user.idUser_sky];
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

exports.deleteUserById = async (req, res, next) => {
  try {
    let query = "UPDATE users as u SET u.block = 1 WHERE u.idUser_sky = ?";
    let data = [req.params.id];



    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
// TODO
exports.updateUser = async (req, res, next) => {
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
//OK
exports.load = async (req, res, next) => {
  try {
    const query = 'SELECT u.idUser_sky, u.username, p.name,  p.email, p.celphone, u.createdAt, u.role FROM users as u INNER JOIN pessoa as p ON u.Pessoa_idPessoa = p.idPessoa where u.idUser_sky=?';
    const [rows, fields] = await req.connection.execute(query, [req.user.idUser_sky]);
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
exports.getProfile = async (req, res, next) => {
  console.log('getProfile', req.userL);
  res.json(req.userL);
};
//OK
exports.list = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT u.idUser_sky, u.username, u.role, u.createdAt FROM users as u');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
//OK
exports.findById = async (req, res, next) => {
  try {
    const query = 'SELECT u.idUser_sky, u.username, p.name,  p.email, p.celphone, u.createdAt, u.role FROM users as u INNER JOIN pessoa as p ON u.Pessoa_idPessoa = p.idPessoa where u.idUser_sky=?';
    const [rows, fields] = await req.connection.execute(query, [req.params.id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
//OK
exports.changePasswordUserLogged = async (req, res, next) => {
  try {
    let query = "";
    let data = [];
    if (req.body.password) {

      req.body.password = HashPassword.getHash(req.body.password);
      query = "SELECT password FROM users WHERE idUser_sky = ?";
      data = [req.user.idUser_sky];
      const [rows, fields] = await req.connection.execute(query, data);
      console.log("ROWS -> ", rows)
      if (req.body.password === rows[0].password) {
        req.body.newPassword = HashPassword.getHash(req.body.newPassword);

        query = "UPDATE users SET password = ? WHERE idUser_sky = ?";
        data = [req.body.newPassword, req.user.idUser_sky];
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
