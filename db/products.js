const client = require("./index");

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`
        SELECT * FROM products;
        `);
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1;
      `,
      [id]
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
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(title, designer, description, price, category, image)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
        `,
      [title, designer, description, price, category, image]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

async function destroyProduct(id) {
  await client.query(
    `
    DELETE FROM products
    WHERE id = $1;
    `,
    [id]
  );
  await client.query(
    `
  DELETE FROM orders
  WHERE "productId" = $1;
  `,
    [id]
  );
}

async function updateProduct({id, title, designer,
  description,
  price,
  category,
  inventoryQuantity}) {

  try {
      if (title) {
  await client.query (
    `
    UPDATE products SET title = $1 WHERE id = $2 RETURNING *;
    `, [title, id]
  )
      }
      if (designer) {
  await client.query (
    `
    UPDATE products SET designer = $1 WHERE id = $2 RETURNING *;
    `, [designer, id]
        )
            }
      if (description) {
  await client.query (
    `
    UPDATE products SET description = $1 WHERE id = $2 RETURNING *;
    `, [description, id]
  )
      }
      if (price) {
  await client.query (
    `
    UPDATE products SET price = $1 WHERE id = $2 RETURNING *;
    `, [price, id]
  )
      }
      if (category) {
  await client.query (
    `
    UPDATE products SET category = $1 WHERE id = $2 RETURNING *;
    `, [category, id]
  )
      }
      if (inventoryQuantity) {
  await client.query (
    `
    UPDATE products SET inventoryQuantity = $1 WHERE id = $2 RETURNING *;
    `, [inventoryQuantity, id]
  )
      }

const product = getProductById(id)
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
  updateProduct
};
