const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: result.rowCount });
    return result;
  },
};
