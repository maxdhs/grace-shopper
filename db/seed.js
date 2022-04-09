require("dotenv").config();
const client = require("./index");
const { createProduct } = require("./products");
const { createUser } = require("./users");

const dropTables = async () => {
  await client.query(`
  DROP TABLE IF EXISTS orders_products;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  `);
  console.log("done dropping tables");
};

const createTables = async () => {
  // console.log("hi");
  await client.query(`
    CREATE TABLE users(id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false);


    CREATE TABLE products(id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            designer VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
           category VARCHAR(255) NOT NULL,
           image VARCHAR(255) NOT NULL);


           CREATE TABLE orders(id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "isPurchased" BOOLEAN DEFAULT false
            );


            CREATE TABLE orders_products (id SERIAL PRIMARY KEY,
              count INTEGER NOT NULL, 
              "orderId" INTEGER REFERENCES orders(id),
              "productId" INTEGER REFERENCES products(id)
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
      { email: "admin@gmail.com", password: "12345678", isAdmin: true },
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
        image:
          "https://n.nordstrommedia.com/id/sr3/b8dcf687-9d1a-4560-9d8c-7d4d069bc9ad.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Enella Ankle Strap Sandal",
        designer: "Vince Camuto",
        description:
          "Simple and chic, this ankle-strap sandal with a square toe and a flared heel adds minimalist '90s vibes to any ensemble",
        price: 99,
        category: "Heels",
        image:
          "https://n.nordstrommedia.com/id/sr3/df1403c9-fa6b-4e70-b3ab-30fd987a7a1d.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Khari Ankle Tie Sandal",
        designer: "Steve Madden",
        description:
          "Slim ties wrap up and around the ankle of a sleek leather sandal styled with a center toe post and flared heel",
        price: 99,
        category: "Heels",
        image:
          "https://n.nordstrommedia.com/id/sr3/edbf0b08-2155-4e42-b249-29b3f4d87db5.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Celine Embellished Sandal",
        designer: "Jewel Badgley Mischka",
        description:
          "Light-catching crystals dazzle the straps that cross at the ankle of this elegant sandal set on a tapered heel",
        price: 119,
        category: "Heels",
        image:
          "https://n.nordstrommedia.com/id/sr3/d40a662d-016e-42a2-88ee-dae74493749d.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Miller Leather Sandal",
        designer: "Tory Burch",
        description:
          "The iconic sandal with a cult following, the Miller is loved for its timeless style and exceptional comfort with a smooth leather toe post",
        price: 228,
        category: "sandals",
        image:
          "https://n.nordstrommedia.com/id/sr3/798678c1-7ee0-4be8-aff1-7df8e47c0fda.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Jaklyn Espadrille Platform Sandal",
        designer: "Steve Madden",
        description:
          "An espadrille-style platform brings earthy texture and summery style to a breezy sandal",
        price: 74,
        category: "sandals",
        image:
          "https://n.nordstrommedia.com/id/sr3/b13e3bf8-2b34-4d63-857d-1e1f9fcf36aa.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Arizona Soft Slide Sandal",
        designer: "Birkenstock",
        description: "this is a shoe",
        price: 10,
        category: "sneakers",
        image:
          "https://n.nordstrommedia.com/id/sr3/e693ede9-4162-4a12-9789-3d9dcd74f843.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Starie Embellished Sandal",
        designer: "Steve Madden",
        description:
          "Twinkling crystals bring subtle glamour to the slender straps of a versatile slide sandal",
        price: 89,
        category: "Sandals",
        image:
          "https://n.nordstrommedia.com/id/sr3/2df4dda3-ef1a-4ae5-9caf-ab493ff0ddd1.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Air Force 1 Sneaker",
        designer: "Nike",
        description:
          "Back-to-basics detailing keeps the look simple and timeless on an '80s-throwback sneaker reissued with solid colors and a cool, low-cut profile",
        price: 100,
        category: "Sneakers",
        image:
          "https://n.nordstrommedia.com/id/sr3/ce75ef4f-c326-4b72-92be-c32b996b46bc.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Cloud X Training Shoe",
        designer: "ON",
        description:
          "Runner-tech comfort meets street-ready attitude in a sneaker that sets layers of targeted mesh atop a fusion of performance cushioning technologies",
        price: 139,
        category: "Sneakers",
        image:
          "https://n.nordstrommedia.com/id/sr3/1f8f7ad5-a28e-40c8-913c-a0d0f55a3790.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "NMD R1 Primeblue Sneaker",
        designer: "Adidas",
        description:
          "Inspired by '80s design, this stretch-knit sneaker is built with Primeblue, a high-performance recycled fiber made partially from ocean plastics",
        price: 150,
        category: "Sneakers",
        image:
          "https://n.nordstrommedia.com/id/sr3/255739d2-a1f2-462e-9816-0eb49464c384.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Old Skool Sneaker",
        designer: "Vans",
        description:
          "This classic canvas sneaker with suede accents features a comfortably padded collar and a flexible rubber sole",
        price: 64,
        category: "Sneakers",
        image:
          "https://n.nordstrommedia.com/id/sr3/fd510928-904b-4e25-a05e-bab0ebfef156.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Ultra Mini Classic Boot",
        designer: "UGG",
        description:
          "An ultra-short shaft adds a twist to this abbreviated version of a classic UGG boot",
        price: 140,
        category: "Boots",
        image:
          "https://n.nordstrommedia.com/id/sr3/14fc68f8-e46f-4b27-8466-af29652b031a.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Miller Water Resistant Chelsea Boot",
        designer: "Caslon",
        description:
          "A lug sole amplifies the utilitarian appeal of this upgraded, water-resistant version of a classic Chelsea boot",
        price: 99,
        category: "Boots",
        image:
          "https://n.nordstrommedia.com/id/sr3/746d10d2-e04f-4243-ac21-4a8cd27df11b.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Jadon Boot",
        designer: "Dr. Martens",
        description:
          "A thick Quad Retro sole boosts a smooth leather mid-calf boot with an '80s-rewind profile",
        price: 200,
        category: "Boots",
        image:
          "https://n.nordstrommedia.com/id/sr3/62b53dab-136a-4e94-a354-7601c14269a3.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
      },
      {
        title: "Thrived Bootie",
        designer: "Steve Madden",
        description:
          "A V-cut topline and pointy toe distinguish a supple suede bootie grounded by a stacked block heel",
        price: 129,
        category: "Boots",
        image:
          "https://n.nordstrommedia.com/id/sr3/f5ac7fc0-27fb-44c6-9100-d347ea2f83f8.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838",
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
