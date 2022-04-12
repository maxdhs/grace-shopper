const bcrypt = require("bcrypt");
const client = require("./index");

const createUser = async ({ email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *;`,
      [email, hashedPassword]
    );
    delete user.password;
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ email, password }) => {
  const {
    rows: [user],
  } = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);
  const hashedPassword = user.password;

  const passwordCompared = await bcrypt.compare(password, hashedPassword);

  try {
    if (!passwordCompared) {
      return false;
    } else {
      const {
        rows: [user],
      } = await client.query(`SELECT id, email FROM users WHERE email=$1;`, [
        email,
      ]);
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

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT id, email FROM users WHERE email=$1;`, [
      email,
    ]);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUser, getUserById, getUserByEmail };
