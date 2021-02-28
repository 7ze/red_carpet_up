const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

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
