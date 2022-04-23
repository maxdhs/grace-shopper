const { user } = require("pg/lib/defaults");
const client = require("./index");

async function createOrder({ userId }) {
  try {
    const {
      rows: [CreatedOrder],
    } = await client.query(
      `
      INSERT INTO orders ("userId")
      VALUES ($1)
      RETURNING *;
      `,
      [userId]
    );

    return CreatedOrder;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`SELECT * FROM orders;`);
    return orders;
  } catch (error) {
    res.send(error);
  }
}

async function getOrdersByUser(id) {
  try {
    const output = await getAllOrders();
    console.log(output);
    const orders = output.filter((order) => order.userId === id);

    return orders;
  } catch (error) {
    throw error;
  }
}

const getUserIdByOrderId = async (orderId) => {
  try {
    const order = await getOrderById(orderId);
    const userId = order.userId;
    return userId;
  } catch (error) {
    throw error;
  }
};

async function getOrderById(ordersId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1;
        `,
      [ordersId]
    );
    if (!order)
      throw {
        name: `OrderError`,
        message: `No Order exists with that id`,
      };
    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder({ id, count }) {
  try {
    if (count) {
      await client.query(
        `UPDATE order_products SET count = $1 WHERE id = $2 RETURNING *;`,
        [count, id]
      );
    }
    const order = await getOrderById(id);

    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrderPurchased(id) {
  try {
    await client.query(
      `UPDATE orders SET "isPurchased" = true WHERE id = $2 RETURNING *;`,
      [id]
    );
    const order = await getOrderById(id);

    return order;
  } catch (error) {
    throw error;
  }
}

async function destroyOrder(id) {
  try {
    await client.query(
      `
          DELETE FROM order_products 
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

async function getCartByUserId(userId) {
  try {
    const cart = await client.query(
      `SELECT * FROM orders WHERE "userId" = $1 AND "isPurchased" = false`,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateUserIdOrdersTable({ newUserId, orderId }) {
  try {
    await client.query(
      `UPDATE orders SET "userId" = $1 WHERE id = $2 RETURNING *;`,
      [newUserId, orderId]
    );

    const order = getOrderById(orderId);
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
  getAllOrders,
  getUserIdByOrderId,
  getCartByUserId,
  updateUserIdOrdersTable,
  updateOrderPurchased,
};
