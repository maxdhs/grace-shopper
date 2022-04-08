const { client } = require('./');

const getProducts = async () => {
  const response = await client.query(`
    SELECT * FROM products;
    `);
  return response.rows;
};

const getSingleProduct = async (id) => {
  const response = await client.query(
    `
  SELECT * FROM products
  WHERE id = $1;
  `,
    [id]
  );
  return response.rows;
};

const getProductsInCatagory = async (catagory) => {
  const response = await client.query(
    `
  SELECT * FROM products
  WHERE catagory = $1
  `,
    [catagory]
  );
  return response.rows;
};

module.exports = {
  getProducts,
  getProductsInCatagory,
  getSingleProduct,
};
