const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
};

/**
 *
 * Users Model
 * --------------------------------------
 * create table users (
 * id serial primary key,
 * username varchar(100) not null unique,
 * name varchar(100) not null,
 * password varchar(150) not null,
 * role varchar(20) not null,
 * refresh_token varchar(300),
 * createdat date default now() not null
 * );
 *
 */
