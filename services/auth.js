const db = require('../db');
const {
  hash_password,
  check_if_user_exists,
  insert_user,
  server_error,
  successul_query,
  check_user_password,
  authorize,
} = require('./library');

async function register_user(user) {
  try {
    const { username, name, password, role } = user;
    if (await check_if_user_exists(username)) {
      throw {
        custom_error: true,
        status: 400,
        response: {
          message: 'User already exists.',
        },
      };
    } else {
      const hashed_password = await hash_password(password);
      await insert_user([username, name, hashed_password, role]);
      return [null, successul_query];
    }
  } catch (err) {
    console.error(err);
    return err.custom_error ? [err] : [server_error];
  }
}

async function authenticate_user_login(user) {
  try {
    if (await check_if_user_exists(user.username)) {
      const response = await check_user_password(user);
      if (response.status == '200') authorize(user);
      return [null, response];
    } else {
      throw {
        custom_error: true,
        status: 400,
        response: {
          message: 'No user found!',
        },
      };
    }
  } catch (err) {
    console.error(err);
    return err.custom_error ? [err] : [server_error];
  }
}

module.exports = { register_user, authenticate_user_login };
