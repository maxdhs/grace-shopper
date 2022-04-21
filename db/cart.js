const client = require(".");
const { createOrder } = require("./orders");
const { getProductsByOrderId } = require("./products");

const getCart = async (userId) => {
  const response = await client.query(
    `
  SELECT * FROM orders
  WHERE user_id = $1
  AND is_purchased = false;
  `,
    [userId]
  );
  let cart = response.rows[0];
  if (!cart) {
    cart = await createOrder(userId);
  }
  const products = await getProductsByOrderId(cart.id);
  cart.products = products;
  return cart;
};

const getOrders = async (userId) => {
  const response = await client.query(
    `
  SELECT * FROM orders
  WHERE user_id = $1;
  `,
    [userId]
  );
  let orders = response.rows;
  for (let order of orders) {
    const products = await getProductsByOrderId(order.id);
    order.products = products;
  }
  return orders;
};

const addProductToCart = async ({ orderId, productId, price, quantity }) => {
  const response = await client.query(
    `
  INSERT INTO products_orders (order_id, product_id, price, quantity) VALUES ($1, $2, $3, $4)
  RETURNING *;
  `,
    [orderId, productId, price, quantity]
  );
  return response.rows[0];
};

const editItemQuantity = async ({ cart_item_id, quantity }) => {
  const response = await client.query(
    `
  UPDATE products_orders
  SET quantity = $1
  WHERE id = $2
  RETURNING *;
  `,
    [quantity, cart_item_id]
  );
  return response.rows[0];
};

const deleteCartItem = async (cartItemId) => {
  const response = await client.query(
    `
  DELETE FROM products_orders
  WHERE id = $1
  RETURNING *;
  `,
    [cartItemId]
  );
  return response.rows[0];
};

const getUserIdByCartItemId = async (cartItemId) => {
  const response = await client.query(
    `
  SELECT orders.user_id FROM products_orders
  JOIN orders ON orders.id = products_orders.order_id
  WHERE products_orders.id = $1
  `,
    [cartItemId]
  );

  return response.rows[0];
};

const checkoutCart = async (cartId) => {
  const response = await client.query(
    `
  UPDATE orders
  SET is_purchased = true
  WHERE id = $1
  RETURNING *;
  `,
    [cartId]
  );
  return response.rows[0];
};

module.exports = {
  getCart,
  addProductToCart,
  editItemQuantity,
  deleteCartItem,
  getUserIdByCartItemId,
  checkoutCart,
  getOrders,
};
