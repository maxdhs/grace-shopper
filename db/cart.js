const { client } = require('.');

const getCartByUserId = async (userId) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            SELECT * FROM carts
            WHERE "userId" = $1 AND
            "isPurchased" = false;
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
    const { rows: cart } = await client.query(
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
    const { rows: cart } = await client.query(
      `
            INSERT INTO carts ("userId")
            VALUES ($1)
            RETURNING *;
        `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};

const addProductToCart = async (count, price, cartId, productId) => {
  try {
    const {
      rows: [cartProduct],
    } = await client.query(
      `
            INSERT INTO carts_products(count, price, "cartId", "productId")
            VALUES ($1,$2,$3, $4)
            RETURNING *;
            `,
      [count, price, cartId, productId]
    );
    const {
      rows: [cart],
    } = await client.query(
      `
    SELECT * FROM carts
    WHERE id = $1;
    `,
      [cartProduct.cartId]
    );
    const { rows: products } = await client.query(
      `
                  SELECT carts_products.*
                  FROM carts
                  JOIN carts_products
                  ON carts.id = carts_products."cartId"
                  WHERE carts.id = $1;
                  `,
      [cartProduct.cartId]
    );
    cart.products = products;
    return cart;
  } catch (error) {
    throw error;
  }
};

const purchaseCart = async (cartId) => {
  try {
    const response = await client.query(
      `
        UPDATE carts
        SET "isPurchased" = true
        WHERE carts.id = $1
        `,
      [cartId]
    );
  } catch (error) {
    throw error;
  }
};

const getCartProducts = async () => {
  try {
    const { rows: carts } = await client.query(`
    SELECT * FROM carts;
    `);
    for (const cart of carts) {
      const { rows: products } = await client.query(
        `
            SELECT carts_products.*
            FROM carts
            JOIN carts_products
            ON carts.id = carts_products."cartId"
            WHERE carts.id = $1;
            `,
        [cart.id]
      );
      cart.products = products;
    }
    return carts;
  } catch (error) {
    throw error;
  }
};

const getCartProductsByUserId = async (userId) => {
  try {
    const cart = await getCartByUserId(userId);
    console.log('cart');
    const { rows: products } = await client.query(
      `
                SELECT carts_products.*
                FROM carts
                JOIN carts_products
                ON carts.id = carts_products."cartId"
                WHERE carts.id = $1;
                `,
      [cart.id]
    );
    cart.products = products;
    return cart;
  } catch (error) {
    throw error;
  }
};

const deleteProductFromCart = async (cartId, productId) => {
  try {
    const {
      rows: [deletedProduct],
    } = await client.query(
      `
          DELETE FROM carts_products
          WHERE "cartId" = $1 AND
          "productId" = $2
          `,
      [cartId, productId]
    );
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

const editCount = async (count, cartId, productId) => {
  try {
    const {
      rows: [editedProduct],
    } = await client.query(
      `
          UPDATE carts_products
          SET count = $1
          WHERE "cartId" = $2 AND
          "productId" = $3;
          `,
      [count, cartId, productId]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCart,
  editCount,
  getCartByUserId,
  addProductToCart,
  deleteProductFromCart,
  getCartProductsByUserId,
  purchaseCart,
  getCartById,
  getCartProducts,
};
