const { users_services } = require('../services');
const { get_users } = users_services;

async function users(req, res) {
  const [error, result] = await get_users();
  if (error) res.error(error.status).json(error.response);
  else res.status(result.status).json(result.response);
}

module.exports = { users };
