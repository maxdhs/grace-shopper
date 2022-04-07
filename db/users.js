const bcrypt = require("bcrypt");
const { client } = require("./client");

const createUser = async ({ username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *;`,
      [username, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  const {
    rows: [user],
  } = await client.query(`SELECT * FROM users WHERE username = $1;`, [
    username,
  ]);
  const hashedPassword = user.password;

  const passwordCompared = await bcrypt.compare(password, hashedPassword);

  try {
    if (!passwordCompared) {
      return false;
    } else {
      const {
        rows: [user],
      } = await client.query(
        `SELECT id, username FROM users WHERE username=$1;`,
        [username]
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    delete user.password;
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
      `SELECT id, username FROM users WHERE username=$1;`,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUser, getUserById, getUserByUsername };
