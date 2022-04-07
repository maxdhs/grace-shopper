const { client } = require("./");

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

const getAllProducts = async () => {
  const response = await client.query(`
    SELECT * FROM products;
    `);
  return response.rows;
};

// getProductById function

// getProductByCategory function

// createProduct for admin

// updateProduct for admin

// deleteProduct for admin

module.exports = {
  getAllProducts,
  createProducts,
};
