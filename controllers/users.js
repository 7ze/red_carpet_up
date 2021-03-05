const { register_user, authenticate_user_login } = require('../services');

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

module.exports = { register, login };
