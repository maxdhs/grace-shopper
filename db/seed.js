const { client } = require('.');
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
} = require('./users');
require('dotenv').config();

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...');

    await createUser({
      email: 'albert@gmail.com',
      username: 'albert',
      password: 'bertie99',
    });

    await createUser({
      email: 'sandra@gmail.com',
      username: 'sandra',
      password: '2sandy4me',
    });

    await createUser({
      email: 'glamgal@gmail.com',
      username: 'glamgal',
      password: 'soglam',
    });

    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function testDB() {
  try {
    console.log('Starting to test database...');

    const allUsers = await getAllUsers();
    console.log('getAllUsers', allUsers);

    const userByUsername = await getUserByUsername('albert');
    console.log('getUserByUsername', userByUsername);

    const user = await getUser({ username: 'albert', password: 'bertie99' });
    console.log('here are users', user);

    console.log('Finished testing database!');
  } catch (error) {
    console.error('Error testing database!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log('Error during rebuildDB');
    console.log(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

// const seedDB = async () => {

//   await client.query(`
//     DROP TABLE IF EXISTS orders_products;
//     DROP TABLE IF EXISTS products;
//     DROP TABLE IF EXISTS orders;
//     DROP TABLE IF EXISTS reviews;
//     DROP TABLE IF EXISTS users;

//     CREATE TABLE products (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) UNIQUE,
//       description TEXT NOT NULL,
//       price INTEGER NOT NULL,
//       quantity INTEGER NOT NULL,
//       catagory VARCHAR(255) NOT NULL );

//     CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       username VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) UNIQUE NOT NULL);

//     CREATE TABLE orders (id SERIAL PRIMARY KEY, "userId" INTEGER REFERENCES users(id), price INTEGER NOT NULL);
//     CREATE TABLE reviews (id SERIAL PRIMARY KEY, "userId" INTEGER REFERENCES users(id), text TEXT NOT NULL);

//     CREATE TABLE orders_products (
//       id SERIAL PRIMARY KEY,
//       count INTEGER NOT NULL,
//       "orderId" INTEGER REFERENCES orders(id),
//       "productId" INTEGER REFERENCES products(id));
//   `);

//   console.log('DB SEEDED.');
// };

// seedDB();
