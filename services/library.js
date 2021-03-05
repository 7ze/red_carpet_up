const bcrypt = require('bcryptjs');
const db = require('../db');

const server_error = {
  status: 500,
  response: {
    message: 'Server issue. Sorry for the inconvenience.',
  },
};

const successul_query = {
  status: 200,
  response: {
    message: 'Successful completed query.',
  },
};

async function hash_password(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function check_if_user_exists(username) {
  const { rowCount } = await db.query(
    'select * from users where username = $1',
    [username]
  );
  return rowCount > 0 ? true : false;
}

async function insert_user(user) {
  const insert_user_query =
    'insert into users (username, name, password, role) values ($1, $2, $3, $4)';
  await db.query(insert_user_query, user);
}

async function check_user_password(user) {
  const { username, password } = user;
  const {
    rows,
  } = await db.query('select password from users where username = $1', [
    username,
  ]);
  if (await bcrypt.compare(password, rows[0].password)) {
    return { status: 200, response: { message: 'Login successful' } };
  } else {
    return { status: 400, response: { message: 'Invalid credentials' } };
  }
}

module.exports = {
  hash_password,
  check_if_user_exists,
  insert_user,
  server_error,
  successul_query,
  check_user_password,
};
