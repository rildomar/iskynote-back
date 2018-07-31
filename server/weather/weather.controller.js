const YQL = require('yql');

module.exports.weatherData = async (req, res, next) => {
  try {
    var query = new YQL(getWeatherQuery(req.query.city, req.query.uf, req.query.unity));


    query.exec(function (err, data) {
      res.json(data.query.results.channel);
    });
  } catch (error) {
    next(error);
  }
};

getWeatherQuery = (city, uf, unity) => {
  return 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' +
    city + ',' + uf + '") and u="' + unity + '"'
};
