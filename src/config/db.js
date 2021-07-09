const { Pool } = require("pg");

module.exports = new Pool({
  user: 'postgres',
  password: 'p@ssw0rd',
  host: 'localhost',
  port: '5432',
  database: 'gymmanager'
})

