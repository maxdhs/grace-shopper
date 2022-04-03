require("dotenv").config();
const fetch = require("node-fetch");
const client = require("./");

const seedFakeStore = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  for (let product of products) {
    const { title, description, price, category, image } = product;
    await client.query(
      `
    INSERT INTO products (title, description, price, category, image, inventory) VALUES ($1, $2, $3, $4, $5, $6);
    `,
      [title, description, price, category, image, product.rating.count]
    );
  }
};

const seedDB = async () => {
  await client.query(`
    DROP TABLE IF EXISTS products_orders;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;

    CREATE TABLE products (id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE NOT NULL, description TEXT NOT NULL, price FLOAT NOT NULL, image VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, inventory INT NOT NULL DEFAULT '0');

    CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL);

    CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), is_purchased BOOL DEFAULT 'false');

    CREATE TABLE products_orders (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id), product_id INT REFERENCES products(id), price INT NOT NULL, quantity INT NOT NULL);

    INSERT INTO products (title, description, price, category, image) VALUES ('Acer Nitro 5 Laptop', 'amazing laptop', '1000', 'fake category', 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg');

    INSERT INTO users(email, password) VALUES ('max@gmail.com', '123Password');

    INSERT INTO orders(user_id) VALUES (1);

    INSERT INTO products_orders (order_id, product_id, price, quantity) VALUES (1, 1, 10000, 10);

    `);

  await seedFakeStore();

  console.log("DB SEEDED.");
};

seedDB();
