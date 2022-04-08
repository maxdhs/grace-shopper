require("dotenv").config();
const client = require("./index");
const { createProduct } = require("./products");
const { createUser } = require("./users");

const dropTables = async () => {
  await client.query(`
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  `);
  console.log("done dropping tables");
};

const createTables = async () => {
  console.log("hi");
  await client.query(`
    CREATE TABLE users(id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL);


    CREATE TABLE products(id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            designer VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
           category VARCHAR(255) NOT NULL,
           "inventoryQuantity" INTEGER NOT NULL);


    CREATE TABLE orders(id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users(id),
             "productId" INTEGER REFERENCES products(id),
             "isPurchased" BOOLEAN DEFAULT false,
    );
  `);
  console.log("done making tables");
};

// const createTables = async () => {
//   await client.query(`

//     CREATE TABLE products (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) UNIQUE NOT NULL,
//       designer VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL,
//       price INTEGER NOT NULL,
//       category VARCHAR(255) NOT NULL,
//       "inventoryQuantity" INTEGER NOT NULL,
//     );

//       CREATE TABLE users (id SERIAL PRIMARY KEY,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL;
//         );

//       CREATE TABLE orders (id SERIAL PRIMARY KEY,
//         "userId" INTEGER REFERENCES users(id),
//         "productId" INTEGER REFERENCES products(id),
//         );
//     `);

//   console.log("DB SEEDED.");
// };

async function createInitialUsers() {
  try {
    const usersToCreate = [
      { email: "email1@gmail.com", password: "12345678" },
      { email: "email2@gmail.com", password: "12345678" },
      { email: "email3@gmail.com", password: "12345678" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("done making users");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

const createInitialProducts = async () => {
  try {
    const productsToCreate = [
      {
        title: "Paily Slide Sandal",
        designer: "Dolce Vita",
        description:
          "Chunky braided straps add an eye-catching touch to this slide sandal lifted by a block heel",
        price: 125,
        category: "Heels",
        inventoryQuantity: 5,
      },
      {
        title: "Enella Ankle Strap Sandal",
        designer: "Vince Camuto",
        description:
          "Simple and chic, this ankle-strap sandal with a square toe and a flared heel adds minimalist '90s vibes to any ensemble",
        price: 99,
        category: "Heels",
        inventoryQuantity: 5,
      },
      {
        title: "Khari Ankle Tie Sandal",
        designer: "Steve Madden",
        description:
          "Slim ties wrap up and around the ankle of a sleek leather sandal styled with a center toe post and flared heel",
        price: 99,
        category: "Heels",
        inventoryQuantity: 5,
      },
      {
        title: "Celine Embellished Sandal",
        designer: "Jewel Badgley Mischka",
        description:
          "Light-catching crystals dazzle the straps that cross at the ankle of this elegant sandal set on a tapered heel",
        price: 119,
        category: "Heels",
        inventoryQuantity: 5,
      },
      {
        title: "Miller Leather Sandal",
        designer: "Tory Burch",
        description:
          "The iconic sandal with a cult following, the Miller is loved for its timeless style and exceptional comfort with a smooth leather toe post",
        price: 228,
        category: "sandals",
        inventoryQuantity: 5,
      },
      {
        title: "Jaklyn Espadrille Platform Sandal",
        designer: "Steve Madden",
        description:
          "An espadrille-style platform brings earthy texture and summery style to a breezy sandal",
        price: 74,
        category: "sandals",
        inventoryQuantity: 5,
      },
      {
        title: "Arizona Soft Slide Sandal",
        designer: "Birkenstock",
        description: "this is a shoe",
        price: 10,
        category: "sneakers",
        inventoryQuantity: 5,
      },
      {
        title: "Starie Embellished Sandal",
        designer: "Steve Madden",
        description:
          "Twinkling crystals bring subtle glamour to the slender straps of a versatile slide sandal",
        price: 89,
        category: "Sandals",
        inventoryQuantity: 5,
      },
      {
        title: "Air Force 1 Sneaker",
        designer: "Nike",
        description:
          "Back-to-basics detailing keeps the look simple and timeless on an '80s-throwback sneaker reissued with solid colors and a cool, low-cut profile",
        price: 100,
        category: "Sneakers",
        inventoryQuantity: 5,
      },
      {
        title: "Cloud X Training Shoe",
        designer: "ON",
        description:
          "Runner-tech comfort meets street-ready attitude in a sneaker that sets layers of targeted mesh atop a fusion of performance cushioning technologies",
        price: 139,
        category: "Sneakers",
        inventoryQuantity: 5,
      },
      {
        title: "NMD R1 Primeblue Sneaker",
        designer: "Adidas",
        description:
          "Inspired by '80s design, this stretch-knit sneaker is built with Primeblue, a high-performance recycled fiber made partially from ocean plastics",
        price: 150,
        category: "Sneakers",
        inventoryQuantity: 5,
      },
      {
        title: "Old Skool Sneaker",
        designer: "Vans",
        description:
          "This classic canvas sneaker with suede accents features a comfortably padded collar and a flexible rubber sole",
        price: 64,
        category: "Sneakers",
        inventoryQuantity: 5,
      },
      {
        title: "Ultra Mini Classic Boot",
        designer: "UGG",
        description:
          "An ultra-short shaft adds a twist to this abbreviated version of a classic UGG boot",
        price: 140,
        category: "Boots",
        inventoryQuantity: 5,
      },
      {
        title: "Miller Water Resistant Chelsea Boot",
        designer: "Caslon",
        description:
          "A lug sole amplifies the utilitarian appeal of this upgraded, water-resistant version of a classic Chelsea boot",
        price: 99,
        category: "Boots",
        inventoryQuantity: 5,
      },
      {
        title: "Jadon Boot",
        designer: "Dr. Martens",
        description:
          "A thick Quad Retro sole boosts a smooth leather mid-calf boot with an '80s-rewind profile",
        price: 200,
        category: "Boots",
        inventoryQuantity: 5,
      },
      {
        title: "Thrived Bootie",
        designer: "Steve Madden",
        description:
          "A V-cut topline and pointy toe distinguish a supple suede bootie grounded by a stacked block heel",
        price: 129,
        category: "Boots",
        inventoryQuantity: 5,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("done making products");
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
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
