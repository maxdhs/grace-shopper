const client = require(".");

const registerUser = async ({ email, hashed }) => {
  const response = await client.query(
    `
    INSERT INTO users (email, password) VALUES ($1, $2)
    RETURNING id, email;
    `,
    [email, hashed]
  );
  return response.rows[0];
};

const getUserByEmail = async (email) => {
  const response = await client.query(
    `
    SELECT * FROM users
    WHERE email = $1
    ;
    `,
    [email]
  );
  return response.rows[0];
};

module.exports = {
  getUserByEmail,
  registerUser,
};
