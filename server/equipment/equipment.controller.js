const _ = require('lodash');

const create = async (req, res, next) => {
  try{
    const query = `
      INSERT INTO equipamento
      (velame_principal, velame_reserva, container, daa_model, dt_pack, createdAt, updatedAt)
      VALUES
      (?,?,?,?,?,?);
    `;
    const data = [req.body.main_canopy, req.body.reserve_canopy, req.body.container, req.body.daa_model, req.body.dt_pack, new Date(), new Date()]
    const [rows, fields] = await req.connection.execute(query, data);
    res.equimentObj = rows;
    return next();
  } catch (error) {
    next(error);
  }
};

const created = async (req, res, next) => { res.json(res.equimentObj)};

const update = async (req, res, next) => {
  try{
    const query = `
      UPDATE equipamento SET
      velame_principal = ?,
      velame_reserva = ?,
      container = ?,
      daa_model = ?,
      dt_pack = ?,
      updatedAt = ?,
      WHERE equipment_id = ?
    `;
    const data = [
      req.body.main_canopy, 
      req.body.reserve_canopy,
      req.body.container, 
      req.body.daa_model,
      req.body.dt_pack, 
      new Date(),
      req.params.id
    ];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const findEquipment = async () => {
  try{
    const query = `
      SELECT * FROM equipamento WHERE equipment_id = ?
    `;
    const data = [req.params.id];
    const [rows, fields] = await req.connection.execute(query, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try{
    const query = `
      DELETE FROM equipamento
      WHERE equipment_id = ?;
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
  find: findEquipment
};
