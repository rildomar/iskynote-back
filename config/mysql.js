// get the client
const mysql2 = require('mysql2');
const bluebird = require('bluebird');
const dbConfig = require('./config')['database'];

function createPool() {
  try {
    const pool = mysql2.createPool({
      host: dbConfig.host,
      user: dbConfig.username,
      database: dbConfig.database,
      password: dbConfig.password,
      Promise: bluebird,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const promisePool = pool.promise();

    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const pool = createPool();

// module.exports = {
//   dbConnRildo: async () => pool.getConnection(),
//   execute: (...params) => pool.execute(...params)
// };

// module.exports = dbConnection;

module.exports = pool;
