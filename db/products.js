const client = require("./");

const createProducts = async ({
  title,
  description,
  price,
  quantity,
  category,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products(title, description, price, quantity, category) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [title, description, price, quantity, category]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

const getProducts = async () => {
  const response = await client.query(`
    SELECT * FROM products;
    `);
  return response.rows;
};

module.exports = {
  getProducts,
};
