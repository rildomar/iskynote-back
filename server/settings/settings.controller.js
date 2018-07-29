module.exports.lookUpUser = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT * FROM users WHERE id=?', [req.body.users_id]);
    const user = rows[0];

    if (!user) {
      return next(new ApiError('Not Found', 404));
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.lookUpB1 = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT * FROM b1 WHERE id=?', [req.body.b1_id]);
    const b1 = rows[0];

    if (!b1) {
      return next(new ApiError('Not Found', 404));
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.lookUpConfig = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute('SELECT * FROM config_graph WHERE config_graph_id=?', [req.params.id]);
    const configGraph = rows[0];

    if (!configGraph) {
      return next(new ApiError('Not Found', 404));
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.userb1 = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute(
      'INSERT INTO users_b1 (users_id, b1_id) VALUES(?,?)', [req.body.users_id, req.body.b1_id]);

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports.listConfig = async (req, res, next) => {
  try {
    const sql = `
      SELECT g.title, cg.* 
      FROM config_graph AS cg, graph AS g, users_b1 AS ub
      WHERE ub.users_id=? AND
      ub.b1_id=? AND
      cg.users_id=ub.users_id AND
      cg.b1_id=ub.b1_id AND
      cg.graph_id = g.id
      `;
    const filters = [req.user.id, 1];
    const [rows, fields] = await req.connection.execute(sql, filters);
    res.json(rows);
  } catch (error) {
    return next(error);
  }
};

module.exports.createConfig = async (req, res, next) => {
  try {
    const sql = `
      INSERT INTO config_graph (graph_id, users_id, b1_id, custom_title, query) VALUES (?,?,?,?,?)
    `;
    let data = [req.body.graph_id, req.user.id, req.body.b1_id, req.body.custom_title, req.body.query];
    const [rows, fields] = await req.connection.execute(sql, data);
    res.json(rows);
  } catch (error) {
    return next(error);
  }
};

module.exports.updateConfig = async (req, res, next) => {
  try {
    const sql = `
      UPDATE config_graph SET graph_id=?, users_id=?, b1_id=?, custom_title=?, query=? WHERE config_graph_id=?
    `;
    let data = [req.body.graph_id, req.user.id, req.body.b1_id, req.body.custom_title, req.body.query, req.params.id];
    const [rows, fields] = await req.connection.execute(sql, data);
    res.json(rows);
  } catch (error) {
    return next(error);
  }
};
