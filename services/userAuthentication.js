const bcrypt = require("bcryptjs");

const hash_password = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const userExists = () => {
  // check if the user exists
};

module.exports = {};
