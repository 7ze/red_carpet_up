const bcrypt = require("bcryptjs");
const db = require("../db");

const hash_password = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const check_password = async (password) => {};

const userExists = async (username) => {
  const { rowCount } = await db.query(
    "select * from users where username = $1",
    [username]
  );
  return rowCount > 0 ? true : false;
};

const insertUser = async (user) => {
  const insertQuery =
    "insert into users (username, name, password, role) values ($1, $2, $3, $4)";
  return await db.query(insertQuery, user);
};

const registerUser = async (user) => {
  const { username, name, password, role } = user;
  if (await userExists(username)) return 400;
  else {
    const hashed_password = await hash_password(password);
    const result = await insertUser([username, name, hashed_password, role]);
    if (result !== 400) return 200;
    else return 400; // bad request
  }
};

const validateUserLogin = async (user) => {
  const { username, password } = user;
  if (await userExists(username)) {
    // check password
  }
};

module.exports = { registerUser, validateUserLogin };
