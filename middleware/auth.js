const jwt = require('jsonwebtoken');

function is_logged_in(req, res, next) {
  const auth_header = req.headers['authorization'];
  const token = auth_header && auth_header.split(' ')[1];
  if (token == null) return res.status(401).json({ message: 'Unauthorized!' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Credentials.' });
    req.user = user;
    next();
  });
}

module.exports = { is_logged_in };
