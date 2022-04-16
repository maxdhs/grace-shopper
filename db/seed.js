const { client } = require(".");
const {
	createProduct,
	getProducts,
	getProductById,
	getProductByCategory,
	editProduct,
	destroyProduct,
} = require("./products");
const {
	getCartByUserID,
	getCartProducts,
	createCart,
	addProductToCart,
	purchasedCart,
	deleteProductFromCart,
	editCount,
} = require("./cart");
const {
	createReview,
	getAllReviews,
	editReview,
	getProductReviews,
	getProductReviewsByProductId,
} = require("./reviews");
const {
	createUser,
	getAllUsers,
	getUserByUsername,
	getUser,
	getUserByEmail,
} = require("./users");
require("dotenv").config();

async function dropTables() {
	try {
		await client.query(`

      DROP TABLE IF EXISTS carts_products;
      DROP TABLE IF EXISTS carts;
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
      `);
		console.log("Finished building tables!");

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
			isAdmin: false,
		});
		await createUser({
			email: "sandra@gmail.com",
			username: "sandra",
			password: "2sandy4me",
			isAdmin: false,
		});
		await createUser({
			email: "glamgal@gmail.com",
			username: "glamgal",
			password: "soglam",
			isAdmin: false,
		});
		await createUser({
			email: "jacob.admin@gmail.com",
			username: "jacob.admin",
			password: "jacob.admin",
			isAdmin: true,
		});
		await createUser({
			email: "emma.admin@gmail.com",
			username: "emma.admin",
			password: "emma.admin",
			isAdmin: true,
		});
		await createUser({
			email: "carmen.admin@gmail.com",
			username: "carmen.admin",
			password: "carmen.admin",
			isAdmin: true,
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
			description: "test description1",
			inventory: 400,
		});
		await createProduct({
			title: "test product2",
			price: 11,
			category: "Kids",
			description: "test description2",
			inventory: 200,
		});
		await createProduct({
			title: "test product3",
			price: 12,
			category: "Mens",
			description: "test description3",
			inventory: 100,
		});
		await createProduct({
			title: "Hiking Boots",
			price: 50,
			category: "Men's Clothing",
			description: "Perfect for walking around after some rain",
			inventory: 25,
		});
		await createProduct({
			title: "Faux Fur Coat",
			price: 80,
			category: "Women Clothing",
			description:
				"A coat created out of faux fur to keep you warm during the winter",
			inventory: 17,
		});
		await createProduct({
			title: "Silver Engraved Ring",
			price: 90,
			category: "Accessories",
			description: "A silver ring with an engraved pattern on it",
			inventory: 8,
		});
		await createProduct({
			title: "product to be destroyed",
			price: 0,
			description: "if you see this in the DB then it didnt work!",
			category: "none",
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
			message: "This is nice but the size is not accurate",
		});
		await createReview({
			creatorId: 2,
			productId: 1,
			message: "I love the fabric of this clothing!",
		});
		await createReview({
			creatorId: 3,
			productId: 2,
			message: "Bought this for my kid looks good!!",
		});
		await createReview({
			creatorId: 3,
			productId: 2,
			message: "Just so I could populate the reviews",
		});
		console.log("Finished creating reviews!");
	} catch (error) {
		console.error("Error creating reviews");
		throw error;
	}
}

async function createInitialCarts() {
	try {
		console.log("Starting to create carts...");
		await createCart(1);
		await createCart(2);
		await createCart(3);
		console.log("Finished creating carts!");
	} catch (error) {
		throw error;
	}
}

async function createInitialCartProducts() {
	try {
		console.log("Starting to create cart products...");
		await addProductToCart(1, 20, 1, 1);
		await addProductToCart(1, 5, 1, 2);
		await addProductToCart(1, 13, 1, 3);
		console.log("Finished creating cart products!");
	} catch (error) {
		throw error;
	}
}

async function testDB() {
	try {
		console.log("Starting to test database...");

		const allUsers = await getAllUsers();
		console.log("getAllUsers", allUsers);

		const userByUsername = await getUserByUsername("albert");
		console.log("getUserByUsername", userByUsername);

		const user = await getUser({ username: "albert", password: "bertie99" });
		console.log("here are users", user);

		const deletedProduct = await destroyProduct(4);
		console.log("destroyProduct", deletedProduct);

		const products = await getProducts();
		console.log("getProducts", products);

		const productToEdit = products[0];
		const updateProduct = await editProduct(
			productToEdit.id,
			productToEdit.name,
			productToEdit.description,
			999,
			"UpdatedCategory",
			999
		);
		console.log(updateProduct);

		const productReviews = await getProductReviews();
		console.log("product reviews", productReviews);

		const productReviewsByProductId = await getProductReviewsByProductId(1);
		console.log("productReviewsByProductId", productReviewsByProductId);

		const editedReview = await editReview({
			id: 1,
			message: "Updated Review: size is not accurate",
		});
		console.log("edited review: 1", editedReview);

		const reviews = await getAllReviews();
		console.log("here are the reviews", reviews);

		const cartByUserID = await getCartByUserID(1);
		console.log(cartByUserID);

		await purchasedCart(1);
		await deleteProductFromCart(1, 1);
		await editCount(5, 1, 2);

		const cartProducts = await getCartProducts();
		console.log(cartProducts[2].products);

		console.log("Finished testing database!");
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
		await createInitialCarts();
		await createInitialCartProducts();
	} catch (error) {
		console.log("Error during rebuildDB");
		console.log(error);
	}
}

rebuildDB()
	.then(testDB)
	.catch(console.error)
	.finally(() => client.end());
