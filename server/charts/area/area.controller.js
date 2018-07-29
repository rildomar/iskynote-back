module.exports.loadData = async (req, res, next) => {
  try {
    if (req.query.b2.length > 1 && req.query.element.length === 1) {
       case1(req, res, next);
    } else if (req.query.b2.length >= 1 && req.query.element.length >= 1) {
       case2(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

const case1 = async (req, res, next) => {
  try {
    let sql = '';
    let results = [];
    let inB2Query = mountInQuery(req.query.b2);
    sql = `
      SELECT DISTINCT sum(m.value) as value, m.date as date
      FROM measurements as m, point_info as pf
      WHERE m.point_number=pf.point_number AND
      pf.b1=? AND
      pf.b2 IN ${inB2Query} AND
      pf.element=? 
      GROUP BY m.date
    `;
    const [rows, fields] = await req.connection.execute(sql, [req.query.b1[0], req.query.element[0]]);
    results.push({
      b2: req.query.b2,
      element: req.query.element[0],
      data: rows
    });
    res.json(results);
  } catch (error) {
    return next(error);
  }
};

const case2 = async (req, res, next) => {
  let sql = '';
  let results = [];
  let promises = [];
  req.query.b2.forEach(async b2 => {
    req.query.element.forEach(async element => {
      sql = `
        SELECT DISTINCT m.value as value, m.date as date 
        FROM measurements m, point_info pf 
        WHERE m.point_number=pf.point_number AND
        pf.b1 = ? AND 
        pf.b2 = ? AND 
        pf.element = ?
      `;
      promises.push(req.connection.execute(sql, [req.query.b1[0], b2, element]));
    });
  });

  Promise.all(promises).then((data) => {
    req.query.b2.forEach((b2, b2Index) => {
      req.query.element.forEach((element, eIndex) => {
        results.push({
          b2: b2,
          element: element,
          data: data[b2Index + eIndex][0]
        });
      });
    });
    res.json(results);
  });
};

const mountInQuery = (points) => {
  let inQuery = '(';
  points.forEach((b2, index) => {
    index + 1 !== points.length ? inQuery += `'${b2}',` : inQuery += `'${b2}')`;
  });
  return inQuery;
};
