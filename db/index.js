const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "loan_db",
  host: "localhost",
  port: 5432,
});

module.exports = {
  async query(text, params) {
    try {
      const start = Date.now();
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      return res;
    } catch (e) {
      console.error(e.stack);
    }
  },
};
