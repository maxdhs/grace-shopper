const { client } = require("./");

const createProducts = async ({}) => {};

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
