const { registerUser } = require("../services/userAuthentication");

const register = async (req, res, next) => {
  const statusCode = await registerUser(req.body);
  res.status(statusCode).send();
  next();
};

const login = async (req, res, next) => {
  next();
};

module.exports = {
  register,
  login,
};
