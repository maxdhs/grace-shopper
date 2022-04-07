require('dotenv').config();
const client = require('./');

const seedDB = async () => {
  
  await client.query(`
    DROP TABLE IF EXISTS carts_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      catagory VARCHAR(255) NOT NULL );

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL);

    CREATE TABLE orders (id SERIAL PRIMARY KEY, "userId" INTEGER REFERENCES users(id), price INTEGER NOT NULL);
    CREATE TABLE reviews (id SERIAL PRIMARY KEY, "userId" INTEGER REFERENCES users(id), text TEXT NOT NULL);

    CREATE TABLE orders_products (
      id SERIAL PRIMARY KEY,
      count INTEGER NOT NULL,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id));
  `);

  console.log('DB SEEDED.');
};

seedDB();
