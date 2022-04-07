require("dotenv").config();
const { client } = require(".");
const { createProducts } = require("./products");

const dropTables = async () => {
  await client.query(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS orders;
  `);
};

const createTables = async () => {};

const createInitialProducts = async () => {};

//create users function

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
