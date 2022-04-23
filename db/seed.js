const { client } = require('.');
const {
  getCartByUserId,
  getCartProducts,
  createCart,
  addProductToCart,
  deleteProductFromCart,
  editCount,
  purchaseCart,
  getCartById,
} = require('./cart');
const {
  createProduct,
  getProducts,
  getProductById,
  getProductByCategory,
  editProduct,
  destroyProduct,
} = require('./products');
const {
  createReview,
  getAllReviews,
  editReview,
  getProductReviews,
  getProductReviewsByProductId,
} = require('./reviews');
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
  getUserByEmail,
} = require('./users');
require('dotenv').config();

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS carts_products;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS reviews;
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
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price INTEGER,
        category VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        inventory INTEGER,
        "imgURL" TEXT NOT NULL
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        message TEXT NOT NULL
      );
      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isPurchased" BOOLEAN DEFAULT FALSE
      );
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
      isAdmin: false,
    });
    await createUser({
      email: 'sandra@gmail.com',
      username: 'sandra',
      password: '2sandy4me',
      isAdmin: false,
    });
    await createUser({
      email: 'glamgal@gmail.com',
      username: 'glamgal',
      password: 'soglam',
      isAdmin: false,
    });
    await createUser({
      email: 'jacob.admin@gmail.com',
      username: 'jacob.admin',
      password: 'jacob.admin',
      isAdmin: true,
    });
    await createUser({
      email: 'emma.admin@gmail.com',
      username: 'emma.admin',
      password: 'emma.admin',
      isAdmin: true,
    });
    await createUser({
      email: 'carmen.admin@gmail.com',
      username: 'carmen.admin',
      password: 'carmen.admin',
      isAdmin: true,
    });
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    await createProduct({
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: 'accessories',
      inventory: 28,
      imgURL:
        'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    });
    await createProduct({
      title: 'Solid Gold Petite Micropave ',
      price: 168,
      description:
        'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
      category: 'accessories',
      inventory: 14,
      imgURL:
        'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    });
    await createProduct({
      title: 'White Gold Plated Princess',
      price: 90,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: 'accessories',
      inventory: 50,
      imgURL:
        'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    });
    await createProduct({
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
      price: 30,
      description:
        'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
      category: 'accessories',
      inventory: 17,
      imgURL:
        'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    });
    await createProduct({
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22,
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      category: 'men',
      inventory: 46,
      imgURL:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    });
    await createProduct({
      title: 'Mens Cotton Jacket',
      price: 55,
      description:
        'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      category: 'men',
      inventory: 54,
      imgURL: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    });
    await createProduct({
      title: 'Mens Casual Slim Fit',
      price: 16,
      description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
      category: 'men',
      inventory: 37,
      imgURL: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    });
    await createProduct({
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: 'men',
      inventory: 28,
      imgURL: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    });
    await createProduct({
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56,
      description:
        '100% Polyester winter coat with detachable liner fabric and hood. 2 Hand pockets, 2 pockets on chest, and a hidden pocket inside.',
      category: 'women',
      inventory: 31,
      imgURL: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    });
    await createProduct({
      title:
        "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 30,
      description:
        '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
      category: 'women',
      inventory: 43,
      imgURL: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    });
    await createProduct({
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 10,
      description:
        '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
      category: 'women',
      inventory: 61,
      imgURL: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    });
    await createProduct({
      id: 19,
      title: "Opna Women's Short Sleeve Shirt",
      price: 9,
      description:
        '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
      category: 'women',
      inventory: 79,
      imgURL: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    });
    await createProduct({
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 10,
      description:
        '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
      category: 'women',
      inventory: 61,
      imgURL: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    });
    await createProduct({
      id: 19,
      title: "Opna Women's Short Sleeve Shirt",
      price: 9,
      description:
        '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
      category: 'women',
      inventory: 79,
      imgURL: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    });
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}
async function createInitialReviews() {
  try {
    console.log('Starting to create reviews');
    await createReview({
      creatorId: 1,
      productId: 4,
      message: 'This is nice and the size is accurate',
    });
    await createReview({
      creatorId: 2,
      productId: 5,
      message: 'I love the fabric of this clothing!',
    });
    await createReview({
      creatorId: 3,
      productId: 6,
      message: 'This shirt is really soft. I wear it the moment it gets out of the dryer!',
    });
    await createReview({
      creatorId: 3,
      productId: 2,
      message: 'This ring fits really well! The quality is amazing and I love the details.',
    });
    await createReview({
      creatorId: 2,
      productId: 1,
      message: 'I gave this as a gift and she told me that everyone notices it!',
    });
    await createReview({
      creatorId: 1,
      productId: 3,
      message: 'I was gonna give this as a promise ring to my girl, but she dumped me. Their refund service is very helpful!',
    });

    console.log('Finished creating reviews!');
  } catch (error) {
    console.error('Error creating reviews');
    throw error;
  }
}

async function createInitialCarts() {
  try {
    console.log('Starting to create carts...');
    await createCart(5);
    await createCart(2);
    await createCart(3);
    console.log('Finished creating carts!');
  } catch (error) {
    throw error;
  }
}

async function createInitialCartProducts() {
  try {
    await addProductToCart(1, 20, 3, 1);
    await addProductToCart(1, 30, 3, 2);
    await addProductToCart(1, 5, 2);
    await addProductToCart(1, 13, 3);
  } catch (error) {
    throw error;
  }
}

async function testDB() {
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
  try {
    console.log('Starting to create cart products...');
    await addProductToCart(1, 20, 1, 1);
    await addProductToCart(1, 5, 1, 2);
    await addProductToCart(1, 13, 1, 3);
    console.log('Finished creating cart products!');
  } catch (error) {
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

    // const deletedProduct = await destroyProduct(4);
    // console.log('destroyProduct', deletedProduct);

    const products = await getProducts();
    console.log('getProducts', products);

    const productReviews = await getProductReviews();
    console.log('product reviews', productReviews);

    const productReviewsByProductId = await getProductReviewsByProductId(1);
    console.log('productReviewsByProductId', productReviewsByProductId);

    // const editedReview = await editReview({
    //   id: 1,
    //   message: 'Updated Review: size is not accurate',
    // });
    // console.log('edited review: 1', editedReview);

    const reviews = await getAllReviews();
    console.log('here are the reviews', reviews);

    const newCart = await createCart(1);
    console.log('createCart', newCart);

    const cartByUserID = await getCartByUserId(1);
    console.log('cartByUserId', cartByUserID);

    const cartProduct = await addProductToCart(1, 40, 1, 1);
    console.log('addProductToCart', cartProduct);

    const cartProducts = await getCartProducts();
    console.log('getCartProducts', cartProducts);

    const cartById = await getCartById(1);
    console.log('getCartById', cartById);

    console.log('Finished testing database!');

    await purchaseCart(1);
    await deleteProductFromCart(1, 1);
    await editCount(5, 1, 2);

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
    await createInitialReviews();
    await createInitialCarts();
    await createInitialCartProducts();
  } catch (error) {
    console.log('Error during rebuildDB');
    console.log(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
