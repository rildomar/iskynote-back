const YQL = require('yql');

module.exports.weatherData = async (req, res, next) => {
  try {
    var query = new YQL('select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(' + req.query.latitude + ',' + req.query.longitude + ')")');

    query.exec(function (err, data) {
      res.json(data.query.results.channel);
    });

  } catch (error) {
    next(error);
  }
};
