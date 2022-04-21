const client = require(".");

const createOrder = async (userId) => {
  const response = await client.query(
    `
    INSERT INTO orders (user_id) VALUES ($1)
    RETURNING *;
`,
    [userId]
  );
  return response.rows[0];
};

module.exports = {
  createOrder,
};
