//getOrderProductById
const getOrderProductById = async (id) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(`SELECT * FROM orders_products WHERE id = $1;`, [
      id,
    ]);
    return orderProduct;
  } catch (error) {
    throw error;
  }
};

//addProductToOrder
async function addProductToOrder({ orderId, productId, count }) {
  const {
    rows: [order_product],
  } = await client.query(
    `
      INSERT INTO orders_products("orderId", "productId", count)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
    [orderId, productId, count]
  );
  return order_product;
}

//updateOrderProduct - updates count of product
async function updateOrderProduct({ id, count, price }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `UPDATE routine_activities SET count = $1, price = $2 WHERE id = $3 RETURNING *;`,
      [count, price, id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

//destroyOrderProduct -
const destroyOrderProduct = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `DELETE FROM orders_products WHERE id=$1 RETURNING *;`,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

//getOrderProductsByOrder
const getOrderProductsByOrder = async ({ id }) => {
  try {
    const { rows: orderProducts } = await client.query(
      `
        SELECT *
        FROM orders_products 
        WHERE "orderId" = $1
      `,
      [id]
    );

    return orderProducts;
  } catch (err) {
    throw err;
  }
};
