const bcrypt = require("bcrypt");
const client = require("./index");

const createUser = async ({ email, password, isAdmin }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (isAdmin) {
      const {
        rows: [user],
      } = await client.query(
        `INSERT INTO users(email, password, "isAdmin") VALUES ($1, $2, $3) RETURNING *;`,
        [email, hashedPassword, isAdmin]
      );
      delete user.password;
      req.admin = user;
      return user;
    } else {
      const {
        rows: [user],
      } = await client.query(
        `INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *;`,
        [email, hashedPassword]
      );
      delete user.password;
      req.user = user;
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const getAdminUsers = async ({ email, password }) => {
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
      } = await client.query(
        `SELECT * FROM users WHERE email=$1 AND "isAdmin" = true;`,
        [email]
      );

      delete user.password;
      req.admin = user;
      return user;
    }
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
      } = await client.query(`SELECT * FROM users WHERE email=$1;`, [email]);

      delete user.password;
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

const getAllUsers = async () => {
  const user = await client.query(`
    SELECT * FROM users;
    `);
  return user;
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  getAdminUsers,
};
