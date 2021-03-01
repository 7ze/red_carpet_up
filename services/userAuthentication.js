const bcrypt = require("bcryptjs");
const db = require("../db");

const hash_password = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const userExists = async (username) => {
  const { rowCount } = await db.query(
    "select * from users where username = $1",
    [username]
  );
  return rowCount > 0 ? true : false;
};

const registerUser = async (user) => {
  const insertQuery =
    "insert into users (username, name, password, role) values ($1, $2, $3, $4)";
  const { username, name, password, role } = user;
  if (await userExists(username)) return 400;
  else {
    const hashed_password = await hash_password(password);
    await db.query(insertQuery, [username, name, hashed_password, role]);
    return 200;
  }
};

module.exports = { registerUser };
