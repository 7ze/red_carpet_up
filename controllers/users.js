const { register_user } = require('../services');

async function register(req, res) {
  const [error, result] = await register_user(req.body);
  if (error) res.status(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

async function login(req, res) {
  res.send('login');
}

module.exports = { register, login };
