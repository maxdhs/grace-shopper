const client = require("./");

const getProducts = async () => {
  const response = await client.query(`
    SELECT * FROM products;
    `);
  return response.rows;
};

const getProductsByOrderId = async (orderId) => {
  const response = await client.query(
    `
    SELECT products.*, products_orders.price AS cart_price, products_orders.id AS cart_item_id, products_orders.quantity FROM products
    JOIN products_orders
    ON products.id = products_orders.product_id
    WHERE order_id = $1
    ;
    `,
    [orderId]
  );
  return response.rows;
};

const createProduct = async ({
  title,
  description,
  price,
  category,
  image,
}) => {
  const response = await client.query(
    `
  INSERT INTO products (title, description, price, category, image) VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `,
    [title, description, price, category, image]
  );
  return response.rows[0];
};

const updateProduct = async ({
  title,
  description,
  price,
  category,
  image,
  id,
}) => {
  const response = await client.query(
    `
  UPDATE products SET 
  title = $1,
  description = $2,
  price = $3,
  category = $4,
  image = $5
  WHERE id = $6
  RETURNING *;
  `,
    [title, description, price, category, image, id]
  );
  return response.rows[0];
};

const deleteProduct = async (productId) => {
  const response = await client.query(
    `
  DELETE FROM products
  WHERE id = $1
  RETURNING *;
  `,
    [productId]
  );
  return response.rows[0];
};

module.exports = {
  getProducts,
  getProductsByOrderId,
  createProduct,
  updateProduct,
  deleteProduct,
};
