const bcrypt = require("bcryptjs");
const db = require("../db");

const hash_password = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const userExists = async (username) => {
  const { rowCount } = await db.query(
    "select * from users where username = $1",
    username
  );
  return rowCount > 0 ? true : false;
};

const registerUser = async (user) => {
  const [username, name, password, role] = user;
  if (userExists) return { message: "Bad request." };
  else {
    const hashed_password = await hash_password(password);
    return await db.query(
      "insert into users (username, name, password, role) values ($1, $2, $3, $4)",
      username,
      name,
      hashed_password,
      role
    );
  }
};

module.exports = { registerUser };
