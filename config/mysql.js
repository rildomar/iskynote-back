// get the client
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const dbConfig = require('./config')['database'];

function dbConnection() {
  return new Promise((resolve, reject) => {
    mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.username,
      database: dbConfig.database,
      password: dbConfig.password,
      Promise: bluebird
    }).then((connection) => {
      return resolve(connection);
    });
  });
}

module.exports = dbConnection;