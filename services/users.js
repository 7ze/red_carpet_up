const db = require('../db');
const { server_error } = require('./library');

async function get_users() {
  try {
    const { rows } = await db.query(
      'select id, username,name, role, createdat from users'
    );
    result = { status: 200, response: rows };
    return [null, result];
  } catch (err) {
    console.error(err);
    return [server_error];
  }
}

module.exports = { get_users };
