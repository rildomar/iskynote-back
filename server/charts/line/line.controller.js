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
  let sql = '';
  let results = {
    valueAxes: [],
    graphs: [],
    data: []
  };
  let inB2Query = mountInQuery(req.query.b2);
  sql = `
  SELECT DISTINCT sum(m.value) as '${req.query.element[0]}', m.date as date
  FROM measurements as m, point_info as pf
  WHERE m.point_number=pf.point_number AND
  pf.b1=? AND
  pf.b2 IN ${inB2Query} AND
  pf.element=? 
  GROUP BY m.date
  `;
  const [rows, fields] = await req.connection.execute(sql, [req.query.b1[0], req.query.element[0]]);
  results.valueAxes.push({
    id: "v1",
    axisColor: "#FF6600",
    axisThickness: 2,
    axisAlpha: 1,
    position: "left"
  })
  results.graphs.push({
    valueAxis: "v1",
    lineColor: "#FF6600",
    bullet: "round",
    bulletBorderThickness: 1,
    hideBulletsCount: 30,
    title: req.query.element[0],
    valueField: req.query.element[0],
    fillAlphas: 0
  });
  results.b2 = req.query.b2
  results.data = rows;
  res.json(results);
};

const case2 = async (req, res, next) => {
  let sql = '';
  let results = {
    data: [],
    valueAxes: [],
    graphs: []
  };
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
        data[b2Index + eIndex][0].forEach((measurement, mIndex) => {
          let object = {};
          object[b2 + element] = measurement.value;
          object['date'] = measurement.date
          if (results.data[mIndex] === undefined) {
            results.data.push(object);
          } else {
            results.data[mIndex][b2 + element] = measurement.value
            results.data['date'] = measurement.date
          }
        });
        const color = getRandomColor();
        results.graphs.push({
            id: b2Index + eIndex,
            "valueAxis": "V" + b2Index + eIndex,
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": color,
            "type": "line",
            "title": b2 + element,
            "useLineColorForBulletBorder": true,
            "valueField": b2 + element,
            "balloonText": "[[title]] <b style='font-size: 13px'>[[value]]</b>"
          }),
          results.valueAxes.push({
            id: 'V' + b2Index + eIndex,
            axisColor: color,
            axisThickness: 4,
            axisAlpha: 1,
            position: b2Index + eIndex % 2 === 0 ? "left" : "right",
          });
      });
    });
    res.json(results);
  });
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const mountInQuery = (points) => {
  let inQuery = '(';
  points.forEach((b2, index) => {
    index + 1 !== points.length ? inQuery += `'${b2}',` : inQuery += `'${b2}')`;
  });
  return inQuery;
};


const loadGraphs = (results) => {
  let graph = {
    valueAxis: "v1",
    lineColor: "#FF6600",
    bullet: "round",
    bulletBorderThickness: 1,
    hideBulletsCount: 30,
    title: "red line",
    valueField: "visits",
    fillAlphas: 0
  };
  let graphs = [];

};
