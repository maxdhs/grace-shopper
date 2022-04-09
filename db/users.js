const { client } = require('.');
const bcrypt = require('bcrypt');

const createUser = async (email, username, password) => {
  const SALT_COUNT = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const resp = await client.query(
      `
        INSERT INTO users (email,username,password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [email, username, hashedPassword]
    );
    const user = resp.rows;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async (username, password) => {
  try {
    let user = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1;
    `,
      [username]
    );
    user = user.rows[0];
    const hashedPassword = user.password;
    const match = await bcrypt.compare(password, hashedPassword);
    console.log(match);
    if (match) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const userCheck = async (email, username) => {
  try {
    const resp = await client.query(
      `
      SELECT * FROM users
      WHERE email = $1 OR username = $2;
      `,
      [email, username]
    );
    const user = resp.rows[0];
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  userCheck,
  getUser,
};
