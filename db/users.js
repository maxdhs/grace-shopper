const { client } = require('.');
const bcrypt = require('bcrypt');

const createUser = async ({ email, username, password }) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const { rows: user } = await client.query(
      `
        INSERT INTO users (email,username,password)
        VALUES ($1, $2, $3)
        RETURNING id, email, username;

        `,
      [email, username, hashedPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows: user } = await client.query(`
      SELECT id, email, username FROM users;
    `);

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `

      SELECT * FROM users
      WHERE username = $1;

    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE email = $1;
        `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatch);
    if (passwordMatch) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUser,
};
