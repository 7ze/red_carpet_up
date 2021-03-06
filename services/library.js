require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

const invalid_token_error = {
  custom_error: true,
  status: 401,
  response: {
    message: 'Invalid refresh token',
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

function generate_access_token(username) {
  const user = { name: username };
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '20s',
  });
}

async function generate_refresh_token(username) {
  const user = { name: username };
  const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const update_token_query =
    'update users set refresh_token = $1 where username = $2';
  await db.query(update_token_query, [refresh_token, username]);
  return refresh_token;
}

async function verify_token(refresh_token, username) {
  const {
    rows,
  } = await db.query('select refresh_token from users where username = $1', [
    username,
  ]);
  if (rows[0].refresh_token === refresh_token) {
    const access_token = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return [err];
        const access_token = generate_access_token(user.name);
        return access_token;
      }
    );
    return [null, access_token];
  } else {
    return [{ message: 'Invalid token' }];
  }
}

async function delete_token(username) {
  await db.query('update users set refresh_token = null where username = $1', [
    username,
  ]);
}

module.exports = {
  hash_password,
  check_if_user_exists,
  insert_user,
  server_error,
  invalid_token_error,
  successul_query,
  check_user_password,
  generate_access_token,
  generate_refresh_token,
  verify_token,
  delete_token,
};
