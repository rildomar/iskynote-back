const _ = require('lodash');

const create = async (req, res, next) => {
  try{
    const query = ``;
    const data = [];
    if(!res.addressObj.insertId){
      query = `
        INSERT INTO pessoa
        (name, email, celphone, cbpq, site_cbpq, uspa, site_uspa, createdAt, updatedAt, height, weight, type_of_blood, equipment_id, address_id) VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?);
      `;
      data = [
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
        0, // Falta fazer a validação do campo..
        0,
      ]
    } else {
      query = `
        INSERT INTO pessoa
        (name, email, celphone, cbpq, site_cbpq, uspa, site_uspa, createdAt, updatedAt, height, weight, type_of_blood, equipment_id, address_id) VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?);
      `;
      data = [
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
        res.addressObj.insertId,
      ]
    }
    const [rows, fields] = await req.connection.execute(query, data);
    req.person_id = rows.insertId;
    return next()
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try{
    return res.json({value: "update"});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try{
    return res.json({value: "Removi"});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create: create,
  update: update,
  delete: remove
};
