const fs = require('fs');

// module.exports.list = async (req, res, next) => {
//   const [rows, fields] = await req.connection.execute('SELECT * FROM measurements');
//   fs.writeFileSync('./results.json', JSON.stringify(rows), {
//     encoding: 'utf-8'
//   });

//   var stream = fs.createReadStream('./results.json', {
//     encoding: 'utf-8'
//   });
//   stream.pipe(res);

//   // or use event handlers
//   stream.on('data', function (data) {
//     res.write(data);
//   });

//   stream.on('end', function () {
//     res.end();
//   });
// };

module.exports.powerFactorData = async (req, res, next) => {
  try {
    const [rows, fields] = await req.connection.execute("SELECT m.value as value1, m.date as date FROM measurements as m INNER JOIN point_info as p ON m.point_number = p.point_number WHERE p.b1=? and p.b2 = ? and p.b3 = ? and p.element = 'FP' LIMIT 1000", [req.query.b1, req.query.b2, req.query.b3]);
    console.log(rows)
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
