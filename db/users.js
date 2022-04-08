const { client } = require('.');

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
const createUser = async (email, username, password) => {
  try {
    const resp = await client.query(
      `
        INSERT INTO users (email,username,password)
        VALUES ($1, $2, $3);
        `,
      [email, username, password]
    );
    const user = resp.rows;
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  userCheck,
};
