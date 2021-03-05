const {
  hash_password,
  check_if_user_exists,
  insert_user,
  server_error,
  successul_query,
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

module.exports = { register_user };
