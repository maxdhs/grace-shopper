const client = require("./index");

async function createOrder({ userId, isPurchased }) {
  try {
    const {
      rows: [CreatedOrder],
    } = await client.query(
      `
      INSERT INTO orders ("userId", "isPurchased")
      VALUES ($1,$2)
      RETURNING *;
      `,
      [userId, isPurchased]
    );
    return CreatedOrder;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser({ email }) {
  try {
    const { rows } = await client.query(
      `
      SELECT orders.*, users.email AS "userId" 
      FROM orders
      JOIN users ON users.id = orders."creatorId"
      WHERE email = $1`,
      [email]
    );
    for (const order of rows) {
      const { rows: products } = await client.query(
        `
        SELECT products.*, orders_products.id AS order_productId
        FROM products
        JOIN orders_products ON orders_products."productId" = product.id
        WHERE orders_products."orderId" = $1`,
        [order.id]
      );
      order.products = products;
    }
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1;
        `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

//getUserIdbyOrderId
// const getUser

async function updateOrder({ id, count }) {
  try {
    if (count) {
      await client.query(
        `UPDATE orders_products SET count = $1 WHERE id = $2 RETURNING *;`,
        [count, id]
      );
    }
    const order = getOrderById(id);
    return order;
  } catch (error) {
    throw error;
  }
}

async function destroyOrder(id) {
  try {
    await client.query(
      `
          DELETE FROM orders_products 
          WHERE "orderId" = $1;
      `,
      [id]
    );
    const {
      rows: [order],
    } = await client.query(
      `
          DELETE FROM orders 
          WHERE id = $1
          RETURNING *
      `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  destroyOrder,
};
