const {
  register_user,
  authenticate_user_login,
  get_users,
} = require('../services');

async function users(req, res) {
  const [error, result] = await get_users();
  if (error) res.error(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

async function register(req, res) {
  const [error, result] = await register_user(req.body);
  if (error) res.status(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

async function login(req, res) {
  const [error, result] = await authenticate_user_login(req.body);
  if (error) res.status(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

module.exports = { users, register, login };
