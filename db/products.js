const client = require("./index");

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`
        SELECT * FROM products;
        `);
    return products;
  } catch (error) {
    res.send(error);
  }
};

const getProductById = async (productId) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1;
      `,
      [productId]
    );
    if (!product)
      throw {
        name: `ProductError`,
        message: `No Product exists with that id`,
      };
    return product;
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({
  title,
  designer,
  description,
  price,
  category,
  image,
  count,
}) => {
  try {
    const response = await client.query(
      `
          INSERT INTO products(title, designer, description, price, category, image, count)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
          `,
      [title, designer, description, price, category, image, count]
    );

    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

async function destroyProduct(id) {
  try {
    await client.query(
      `
    DELETE FROM products
    WHERE id = $1;
    `,
      [id]
    );
    await client.query(
      `
  DELETE FROM order_products
  WHERE "productId" = $1;
  `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateProduct({
  id,
  title,
  designer,
  description,
  price,
  category,
  count,
}) {
  try {
    if (title) {
      await client.query(
        `
    UPDATE products SET title = $1 WHERE id = $2 RETURNING *;
    `,
        [title, id]
      );
    }
    if (designer) {
      await client.query(
        `
    UPDATE products SET designer = $1 WHERE id = $2 RETURNING *;
    `,
        [designer, id]
      );
    }
    if (description) {
      await client.query(
        `
    UPDATE products SET description = $1 WHERE id = $2 RETURNING *;
    `,
        [description, id]
      );
    }
    if (price) {
      await client.query(
        `
    UPDATE products SET price = $1 WHERE id = $2 RETURNING *;
    `,
        [price, id]
      );
    }
    if (category) {
      await client.query(
        `
    UPDATE products SET category = $1 WHERE id = $2 RETURNING *;
    `,
        [category, id]
      );
    }
    if (count) {
      await client.query(
        `
    UPDATE products SET count = $1 WHERE id = $2 RETURNING *;
    `,
        [count, id]
      );
    }
    const product = getProductById(id);
    return product;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  destroyProduct,
  updateProduct,
};
