require("dotenv").config();
const { client } = require("./");
const { createProducts } = require("./products");

const dropTables = async () => {
  await client.query(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS orders;
  `);
};

const createTables = async () => {
  await client.query(`
    CREATE TABLE products (id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE NOT NULL, description TEXT NOT NULL, price INTEGER NOT NULL, quantity INTEGER NOT NULL, category TEXT NOT NULL);
    `);

  console.log("DB SEEDED.");
};

const createInitialProducts = async () => {
  try {
    const productsToCreate = [
      {
        title: "shoe1",
        description: "this is a shoe",
        price: 10,
        quantity: 100,
        category: "sneakers",
      },
      {
        title: "shoe2",
        description: "this is a shoe",
        price: 20,
        quantity: 100,
        category: "heels",
      },
      {
        title: "shoe3",
        description: "this is a shoe",
        price: 30,
        quantity: 100,
        category: "flats",
      },
      {
        title: "shoe4",
        description: "this is a shoe",
        price: 40,
        quantity: 100,
        category: "sneakers",
      },
      {
        title: "shoe5",
        description: "this is a shoe",
        price: 50,
        quantity: 100,
        category: "sandals",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));
  } catch (error) {
    throw error;
  }
};

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

module.exports = { rebuildDB };