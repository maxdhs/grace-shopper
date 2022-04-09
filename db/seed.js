const { client } = require('.');
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
} = require('./users');
const {
  createProduct,
  getProducts,
  destroyProduct,
  editProduct,
} = require('./products');
const {
  createCart,
  getCartByUserID,
  addProductToCart,
  getCartById,
  getCartProducts,
} = require('./cart');
require('dotenv').config();

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS carts_products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
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
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT FALSE
      );
    `);

    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(255) NOT NULL,
        inventory INTEGER NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE carts(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isPurchased" BOOLEAN DEFAULT FALSE
    )
    `);

    await client.query(`
    CREATE TABLE carts_products(
      id SERIAL PRIMARY KEY,
      count INTEGER NOT NULL,
      price INTEGER NOT NULL,
      "cartId" INTEGER REFERENCES carts(id),
      "productId" INTEGER REFERENCES products(id)
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

    await createUser({
      email: 'admin1@gmail.com',
      username: 'admin',
      password: 'admin',
    });

    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}
async function createInitialProducts() {
  try {
    console.log('Starting to create products');

    await createProduct({
      name: 'Hiking Boots',
      description: 'Perfect for walking around after some rain',
      price: 50,
      category: "Men's Clothing",
      inventory: 25,
    });

    await createProduct({
      name: 'Faux Fur Coat',
      description:
        'A coat created out of faux fur to keep you warm during the winter',
      price: 80,
      category: "Woman's Clothing",
      inventory: 17,
    });

    await createProduct({
      name: 'Silver Engraved Ring',
      description: 'A silver ring with an engraved pattern on it',
      price: 90,
      category: 'Accessories',
      inventory: 8,
    });

    await createProduct({
      name: 'product to be destroyed',
      description: 'if you see this in the DB then it didnt work!',
      price: 0,
      category: 'none',
      inventory: 0,
    });

    console.log('Finished creating products!');
  } catch (error) {
    throw error;
  }
}

async function createInitialCarts() {
  try {
    console.log('Starting to create carts...');
    await createCart(1);
    await createCart(2);
    await createCart(3);
    console.log('Finished creating carts!');
  } catch (error) {
    throw error;
  }
}

async function createInitialCartProducts() {
  await addProductToCart(1, 20, 1);
  await addProductToCart(1, 5, 2);
  await addProductToCart(1, 13, 3);
}

async function testDB() {
  try {
    console.log('Starting to test database...');

    const allUsers = await getAllUsers();
    console.log('getAllUsers', allUsers);

    const userByUsername = await getUserByUsername('albert');
    console.log('getUserByUsername', userByUsername);

    const admin = await getUserByUsername('admin');
    await client.query(
      `
    UPDATE users
    SET "isAdmin" = true
    WHERE username = $1;
    `,
      [admin.username]
    );
    const updatedAdmin = await getUserByUsername('admin');
    console.log('admin', updatedAdmin);

    const user = await getUser({ username: 'albert', password: 'bertie99' });
    console.log('here are users', user);

    const deletedProduct = await destroyProduct(4);
    console.log('destroyProduct', deletedProduct);

    const products = await getProducts();
    console.log('getProducts', products);

    const productToEdit = products[0];
    const updateProduct = await editProduct(
      productToEdit.id,
      productToEdit.name,
      productToEdit.description,
      999,
      'UpdatedCategory',
      999
    );
    console.log(updateProduct);

    const cartByUserID = await getCartByUserID(1);
    console.log(cartByUserID);

    const cartProducts = await getCartProducts();
    console.log(cartProducts);

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
    await createInitialProducts();
    await createInitialCarts();
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
