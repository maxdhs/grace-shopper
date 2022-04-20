require("dotenv").config();

const client = require("./client");
const { createUser } = require("./users");
const { createMeat } = require("./meat");
const { createOrder } = require("./orders");
const { createUserMeats } = require("./user_meats");

async function dropTables() {
  try {
    console.log("Dropping Tables");
    await client.query(`
        DROP TABLE IF EXISTS user_meats;
        DROP TABLE IF EXISTS meat;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;`);
  } catch (error) {
    console.log("Error Dropping Tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Creating Tables");

    await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        administrator BOOLEAN DEFAULT false
        );
      
        CREATE TABLE meat (
        id SERIAL PRIMARY KEY,
        species VARCHAR (255) NOT NULL,
        style VARCHAR (255) NOT NULL,
        description VARCHAR(255),
        flavor varchar (255) NOT NULL,
        image TEXT,
        weight DECIMAL NOT NULL,
        price DECIMAL NOT NULL
        );
        
        CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        fulfilled BOOLEAN DEFAULT false
        );
        
        CREATE TABLE user_meats (
        id SERIAL PRIMARY KEY,
        meat_id INTEGER REFERENCES meat(id),
        user_id INTEGER REFERENCES users(id),
        order_id INTEGER REFERENCES meat(id)
        );`);
  } catch (error) {
    console.log("Error Creating Tables");
    throw error;
  }
}
async function createInitialUsers() {
  try {
    console.log("Creating Users");
    await createUser({
      email: "hotmeat1@hotmail.com",
      password: "Greasy1",
      first_name: "Tony",
      last_name: "Romano",
      administrator: true,
    });
    await createUser({
      email: "lilsmokey@bigdogzonly.com",
      password: "Greasy2",
      first_name: "James",
      last_name: "McCartney",
    });
    await createUser({
      email: "papaSausage@gmail.com",
      password: "Carved1",
      first_name: "PJ",
      last_name: "Witt",
    });
  } catch (error) {
    console.log("Error Creating Users");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Creating Orders");
    await createOrder({
      user_id: 1,
      fulfilled: false,
    });
    await createOrder({
      user_id: 2,
      fulfilled: false,
    });
    await createOrder({
      user_id: 3,
      fulfilled: false,
    });
  } catch (error) {
    console.log("Error Creating Orders");
    throw error;
  }
}
async function createInitialUserMeats() {
  try {
    console.log("Creating User_Meats");
    await createUserMeats({
      meat_id: 1,
      user_id: 1,
      order_id: 1,
    });
    await createUserMeats({
      meat_id: 2,
      user_id: 2,
      order_id: 2,
    });
    await createUserMeats({
      meat_id: 3,
      user_id: 3,
      order_id: 2,
    });
  } catch (error) {
    console.log("Error Creating User_Meats");
    throw error;
  }
}

async function createInitialMeats() {
  console.log("Making Meats");
  try {
    await createMeat({
      species: "Cow",
      style: "Ground Beef",
      description: "tender, low fat, grass fed",
      flavor: "plain",
      image: "thick",
      weight: 1,
      price: 5,
    });
    await createMeat({
      species: "Gnarwall",
      style: "Filet",
      description:
        "Angled from the northern most part of the north sea, sliced and diced for your pallet pleasure",
      flavor: "delicious",
      image: "slender",
      weight: 0.25,
      price: 700,
    });
    await createMeat({
      species: "Bison",
      style: "Burger",
      description:
        "Hunted by Buffalo Bill himself, Has been marinating for 100 years",
      flavor: "American",
      image: "buttered",
      weight: 20,
      price: 1000,
    });
  } catch (error) {
    console.log("Error making Meat");
    throw error;
  }
}

const seedDB = async () => {
  client.connect();
  await dropTables();
  await createTables();
  await createInitialUsers();
  await createInitialMeats();
  await createInitialOrders();
  await createInitialUserMeats();
  client.end();
};

seedDB();
