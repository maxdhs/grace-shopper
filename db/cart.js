const { client } = require('.');

const getCartByUserID = async (userId) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        SELECT * FROM carts
        WHERE "userId" = $1;
        `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};

const getCartById = async (id) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        SELECT * FROM carts
        WHERE id = $1;
        `,
      [id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};

const createCart = async (userId) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    INSERT INTO carts ("userId")
    VALUES ($1);
    `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};

const addProductToCart = async (price, cartId, productId) => {
  try {
    const {
      rows: [cartProduct],
    } = await client.query(
      `
        INSERT INTO carts_products("cartId",price, "productId")
        VALUES ($1,$2,$3)
        RETURNING *;
        `,
      [cartId, price, productId]
    );
    return cartProduct;
  } catch (error) {
    throw error;
  }
};

const getCartProducts = async () => {
  try {
    const { rows: carts } = await client.query(`
        SELECT carts_products.*, products.*
        FROM carts_products
        JOIN products
        ON products.id = carts_products."productId";
        `);
    return carts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCart,
  getCartByUserID,
  addProductToCart,
  getCartById,
  getCartProducts,
};
