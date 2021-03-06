const { auth_services } = require('../services');
const {
  register_user,
  authenticate_user_login,
  logout_service,
  get_token,
} = auth_services;

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

async function logout(req, res) {
  const [error, result] = await logout_service(req.body.username);
  if (error) res.status(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

async function token(req, res) {
  const [error, result] = await get_token(req.body);
  if (error) res.status(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

module.exports = { register, login, logout, token };
