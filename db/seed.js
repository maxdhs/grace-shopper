require("dotenv").config();
const client = require("./");

const seedDB = async () => {
  await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      designer VARCHAR(255) NOT NULL, 
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      category VARCHAR(255) NOT NULL, 
      "inventoryQuantity" INTEGER NOT NULL,
    );

    INSERT INTO products (title, designer, description, price, category, "inventoryQuantity")
      VALUES ('Paily Slide Sandal', 'Dolce Vita', 'Chunky braided straps add an eye-catching touch to this slide sandal lifted by a block heel', 125, 'Heels', 5),
      ('Enella Ankle Strap Sandal', 'Vince Camuto', 'Simple and chic, this ankle-strap sandal with a square toe and a flared heel adds minimalist '90s vibes to any ensemble', 99.95, 'Heels', 5),
      ('Khari Ankle Tie Sandal', 'Steve Madden', 'Slim ties wrap up and around the ankle of a sleek leather sandal styled with a center toe post and flared heel', 99.95, 'Heels', 5),
      ('Celine Embellished Sandal', 'Jewel Badgley Mischka', 'Light-catching crystals dazzle the straps that cross at the ankle of this elegant sandal set on a tapered heel', 119, 'Heels', 5),
      ('Miller Leather Sandal', 'Tory Burch', 'The iconic sandal with a cult following, the Miller is loved for its timeless style and exceptional comfort with a smooth leather toe post', 228, 'Sandals', 5),
      ('Jaklyn Espadrille Platform Sandal', 'Steve Madden', 'An espadrille-style platform brings earthy texture and summery style to a breezy sandal', 74.95, 'Sandals', 5),
      ('Arizona Soft Slide Sandal', 'Birkenstock', 'A sandal pairs a duo of buckled straps with a legendary footbed that mimics the shape of the foot with excellent support', 134.95, 'Sandals', 5),
      ('Starie Embellished Sandal', 'Steve Madden', 'Twinkling crystals bring subtle glamour to the slender straps of a versatile slide sandal', 89.95, 'Sandals', 5),
      ('Air Force 1 Sneaker', 'Nike', 'Back-to-basics detailing keeps the look simple and timeless on an '80s-throwback sneaker reissued with solid colors and a cool, low-cut profile', 100, 'Sneakers', 5),
      ('Cloud X Training Shoe', 'ON', 'Runner-tech comfort meets street-ready attitude in a sneaker that sets layers of targeted mesh atop a fusion of performance cushioning technologies', 139.99, 'Sneakers', 5),
      ('NMD R1 Primeblue Sneaker', 'Adidas', 'Inspired by '80s design, this stretch-knit sneaker is built with Primeblue, a high-performance recycled fiber made partially from ocean plastics', 150, 'Sneakers', 5),
      ('Old Skool Sneaker', 'Vans', 'This classic canvas sneaker with suede accents features a comfortably padded collar and a flexible rubber sole', 64.95, 'Sneakers', 5),
      ('Ultra Mini Classic Boot', 'UGG', 'An ultra-short shaft adds a twist to this abbreviated version of a classic UGG boot', 140, 'Boots', 5),
      ('Miller Water Resistant Chelsea Boot', 'Caslon', 'A lug sole amplifies the utilitarian appeal of this upgraded, water-resistant version of a classic Chelsea boot', 99.95, 'Boots', 5),
      ('Jadon Boot', 'Dr. Martens', 'A thick Quad Retro sole boosts a smooth leather mid-calf boot with an '80s-rewind profile', 200, 'Boots', 5),
      ('Thrived Bootie', 'Steve Madden', 'A V-cut topline and pointy toe distinguish a supple suede bootie grounded by a stacked block heel', 129.95, 'Boots', 5);

      CREATE TABLE users (id SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL; 
        )

      CREATE TABLE orders (id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        )
    `);

  console.log("DB SEEDED.");
};

seedDB();
