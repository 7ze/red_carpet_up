const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  database: "loan_db",
  host: "localhost",
  port: 5432,
});
