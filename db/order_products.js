const client = require("./index");

const getOrderProductsById = async (id) => {
  try {
    const {
      rows: [orderProducts],
    } = await client.query(`SELECT * FROM order_products WHERE id = $1;`, [id]);
    return orderProducts;
  } catch (error) {
    throw error;
  }
};

const addProductToOrder = async ({ orderId, productId, count }) => {
  try {
    const {
      rows: [order_products],
    } = await client.query(
      `INSERT INTO order_products("orderId", "productId", count) VALUES ($1, $2, $3) RETURNING *;`,
      [orderId, productId, count]
    );
    return order_products;
  } catch (error) {
    throw error;
  }
};

const updateOrderProducts = async ({ id, count }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `UPDATE order_products SET count = $1 WHERE id = $2 RETURNING *;`,
      [count, id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const destroyOrderProducts = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `DELETE from order_products WHERE id = $1 RETURNING *;`,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getProductsByOrder = async ({ id }) => {
  try {
    const { rows: productsByOrder } = await client.query(
      `SELECT * FROM order_products WHERE "orderId" = $1;`,
      [id]
    );
    return productsByOrder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOrderProductsById,
  getProductsByOrder,
  addProductToOrder,
  destroyOrderProducts,
  updateOrderProducts,
};
