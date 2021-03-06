const jwt = require('jsonwebtoken');
const db = require('../db');
const {
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
    const { username } = user;
    if (await check_if_user_exists(username)) {
      const result = await check_user_password(user);
      if (result.status == '200') {
        const access_token = generate_access_token(username);
        result.response.access_token = access_token;
        const refresh_token = await generate_refresh_token(username);
        result.response.refresh_token = refresh_token;
      }
      return [null, result];
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

async function logout_service(username) {
  try {
    if (await check_if_user_exists(username)) {
      await delete_token(username);
      return [
        null,
        { status: 200, response: { message: 'Successfully logged out.' } },
      ];
    } else {
      throw {
        custom_error: true,
        status: 400,
        response: {
          message: 'Invalid request.',
        },
      };
    }
  } catch (err) {
    console.error(err);
    return err.custom_error ? [err] : [server_error];
  }
}

async function get_token({ refresh_token, username }) {
  try {
    if (refresh_token != null) {
      const [err, access_token] = await verify_token(refresh_token, username);
      if (err) {
        invalid_token_error.status = 403;
        throw invalid_token_error;
      } else {
        const result = {
          status: 200,
          response: {
            access_token: access_token,
          },
        };
        return [null, result];
      }
    } else {
      invalid_token_error.response.message = 'No refresh token found.';
      throw invalid_token_error;
    }
  } catch (err) {
    console.error(err);
    return err.custom_error ? [err] : [server_error];
  }
}

module.exports = {
  register_user,
  authenticate_user_login,
  logout_service,
  get_token,
};
