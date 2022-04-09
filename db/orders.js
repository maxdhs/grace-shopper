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

// getOrdersByUser not done yet, needs tweaking

async function getOrdersByUser({ email }) {
  try {
    const { rows } = await client.query(
      `
      SELECT orders.*, users.email AS "creatorName" 
      FROM orders
      JOIN users ON users.id = orders."creatorId"
      WHERE email = $1`,
      [email]
    );
    for (const order of rows) {
      const { rows: products } = await client.query(
        `
        SELECT products.*, order_products.id AS order_productId
        FROM products
        JOIN order_products ON order_products."productId" = product.id
        WHERE order_products."orderId" = $1`,
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
