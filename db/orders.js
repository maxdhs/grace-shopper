const client = require("./client");

async function createOrder({ user_id, fulfilled }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO orders(user_id, fulfilled) 
      VALUES($1, $2)
      RETURNING *;
    `,
      [user_id, fulfilled]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM orders;
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE user_id=$1
      `,
      [userId]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByFulfilled() {
  try {
    const { rows } = await client.query(
      `
          SELECT * FROM orders
          WHERE fulfilled = true`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  getOrdersByFulfilled,
};
