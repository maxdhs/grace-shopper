const { client } = require('./');

const getProducts = async () => {
  try {
    const response = await client.query(`
    SELECT * FROM products;
    `);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await client.query(
      `
  SELECT * FROM products
  WHERE id = $1;
  `,
      [id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const getProductsInCatagory = async (catagory) => {
  try {
    const response = await client.query(
      `
  SELECT * FROM products
  WHERE catagory = $1
  `,
      [catagory]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({
  name,
  description,
  price,
  category,
  inventory,
}) => {
  try {
    const response = await client.query(
      `
  INSERT INTO products (name, description, price, category, inventory)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING *;
  `,
      [name, description, price, category, inventory]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

const destroyProduct = async (id) => {
  try {
    const response = await client.query(
      `
  DELETE FROM products
  WHERE id = $1
  RETURNING *;
  `,
      [id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (
  id,
  name,
  description,
  price,
  category,
  inventory
) => {
  try {
    const response = await client.query(
      `
  UPDATE products
  SET name = $1,
  description = $2,
  price = $3,
  category = $4,
  inventory = $5
  WHERE id = $6
  RETURNING *;
  `,
      [name, description, price, category, inventory, id]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductsInCatagory,
  getProductById,
  createProduct,
  destroyProduct,
  editProduct,
};
