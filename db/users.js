const bcrypt = require("bcrypt");
const client = require("./client");

async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES($1, $2)
        RETURNING *;
      `,
      [username, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
      `,
      [username]
    );
    if (!user) return null;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE id=$1
        `,
      [id]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function editCartForUser(userId, checkCart) {
    try {
        let updatedUser = await getUserById(id);
        // If it doesn't exist, throw an error with a useful message
        if (!updatedUser) {
        throw Error("User does not exist with that id");
        }
        //update the activity if there are no failures, as above
    await client.query(
        `
        UPDATE users
        SET "checkCart"=$1
        WHERE id=$2
        RETURNING *;
        `,
        [checkCart, userId]
    );
    
        updatedUser = await getUserById(id);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    editCartForUser,
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
};