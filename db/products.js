const { client } = require(".");

const createProducts = async({
  title,
  price,
  category,
  description,
  inventory
}) => {
  try {
    const {rows: newProduct} = await client.query(`
      INSERT INTO products(title, price, category, description, inventory)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,[title, price, category, description, inventory]);
    return newProduct;
  } catch (error) {
    console.error("here is the product error",error)
    throw error;
  }
}

const getProducts = async () => {
  try {
    const {rows: products} = await client.query(`
      SELECT * FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
  
};



module.exports = {
  getProducts,
  createProducts
};
