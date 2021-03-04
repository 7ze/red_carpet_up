async function register(req, res, next) {
  res.send('register');
  next();
}

async function login(req, res, next) {
  res.send('login');
  next();
}

module.exports = { register, login };
