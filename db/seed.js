const { client } = require('.');
const { createProduct, getProducts, getProductById, getProductByCategory, editProduct, destroyProduct } = require('./products');
const { createReview, getAllReviews, editReview, getProductReviews, getProductReviewsByProductId } = require('./reviews');
const { createUser, getAllUsers, getUserByUsername, getUser, getUserByEmail } = require('./users');
require('dotenv').config();

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {

    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price INTEGER,
        category VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        inventory INTEGER
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        message TEXT NOT NULL
      );
      `)
    console.log("Finished building tables!");

  } catch (error) {

    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    await createUser({
      email: "albert@gmail.com",
      username: "albert",
      password: "bertie99",
      isAdmin: false
    });
    await createUser({
      email: "sandra@gmail.com",
      username: "sandra",
      password: "2sandy4me",
      isAdmin: false
    });
    await createUser({
      email: "glamgal@gmail.com",
      username: "glamgal",
      password: "soglam",
      isAdmin: false
    });
    await createUser({
      email: "jacob.admin@gmail.com",
      username: "jacob.admin",
      password: "jacob.admin",
      isAdmin: true
    });
    await createUser({
      email: "emma.admin@gmail.com",
      username: "emma.admin",
      password: "emma.admin",
      isAdmin: true
    });
    await createUser({
      email: "carmen.admin@gmail.com",
      username: "carmen.admin",
      password: "carmen.admin",
      isAdmin: true
    });
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");
    await createProduct({
      title: "test product1",
      price: 10,
      category: "Womens",
      description: "test product1",
      inventory: 400
    });
    await createProduct({
      title: "test product2",
      price: 11,
      category: "Kids",
      description: "test product2",
      inventory: 200
    });
    await createProduct({
      title: "test product3",
      price: 12,
      category: "Mens",
      description: "test product3",
      inventory: 100
    });
    await createProduct({
      title: 'Hiking Boots',
      price: 50,
      category: "Men's Clothing",
      description: 'Perfect for walking around after some rain',
      inventory: 25,
    });
    await createProduct({
      title: 'Faux Fur Coat',
      price: 80,
      category: "Women Clothing",
      description:
        'A coat created out of faux fur to keep you warm during the winter',
      inventory: 17,
    });
    await createProduct({
      title: 'Silver Engraved Ring',
      price: 90,
      category: 'Accessories',
      description: 'A silver ring with an engraved pattern on it',
      inventory: 8,
    });
    await createProduct({
      title: 'product to be destroyed',
      price: 0,
      description: 'if you see this in the DB then it didnt work!',
      category: 'none',
      inventory: 0,
    });
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialReviews() {
  try {
    console.log("Starting to create reviews");
    await createReview({
      creatorId: 1,
      productId: 3,
      message: "This is nice but the size is not accurate"
    });
    await createReview({
      creatorId: 2,
      productId: 1,
      message: "I love the fabric of this clothing!"
    });
    await createReview({
      creatorId: 3,
      productId: 2,
      message: "Bought this for my kid looks good!!"
    });
    await createReview({
      creatorId: 3,
      productId: 2,
      message: "Just so I could populate the reviews"
    });
    console.log("Finished creating reviews!")
  } catch (error) {
    console.error("Error creating reviews");
    throw error;
  }
}

async function testDB() {
  try {

    console.log("Starting to test database...");

    // const allUsers = await getAllUsers();
    // console.log("getAllUsers", allUsers);

    // const userByUsername = await getUserByUsername("albert");
    // console.log("getUserByUsername", userByUsername);

    // const user = await getUser({username: "albert", password:"bertie99"});
    // console.log("here are the users", user);

    // const userByEmail = await getUserByEmail("albert@gmail.com");
    // console.log("userByEmail: albert",userByEmail);

    // const products = await getProducts();
    // console.log("here are all the products", products);

    // const productById = await getProductById(2);
    // console.log("here is the product by id:2", productById);

    // const productByCategory = await getProductByCategory("womens");
    // console.log("getProductByCategory: Womens", productByCategory);

    // const editedProduct = await editProduct({id: 1, description: "here is the Updated Description"})
    // console.log("editedProduct: 1", editedProduct);

    const productReviews = await getProductReviews();
    console.log("product reviews", productReviews);

    const productReviewsByProductId = await getProductReviewsByProductId(1);
    console.log("productReviewsByProductId",productReviewsByProductId);

    // const deletedProduct = await destroyProduct(7);
    // console.log("deleted product: id 7", await getProducts());
    //----delete is working

    const editedReview = await editReview({id: 1, message: "Updated Review: size is not accurate"});
    console.log("edited review: 1", editedReview);

    const reviews = await getAllReviews();
    console.log("here are the reviews", reviews);

    console.log("Finished testing database!")

  } catch (error) {

    console.error("Error testing database!");
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
    await createInitialReviews();

  } catch (error) {

    console.log("Error during rebuildDB");
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
