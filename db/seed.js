require("dotenv").config();
const client = require("./");

const seedDB = async () => {
  await client.query(`
    DROP TABLE IF EXISTS products;

    CREATE TABLE beers (
      id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE, 
      discription VARCHAR(255), image VARCHAR(255), 
      brewery VARCHAR(255), style VARCHAR(255), abv INTEGER,
      price INTEGER, "avgScore" INTEGER
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "cartCheck" BOOLEAN DEFAULT false
    );

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "isPurchased" BOOLEAN DEFAULT false
    );
    
    beers_users(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "beerId" INTEGER REFERENCES beers(id),
      "favorite" BOOLEAN DEFAULT false,
      "purchased" BOOLEAN DEFAULT false,
      "score" INTEGER
    );

    carts_beers(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES carts(id),
      "beerId" INTEGER REFERENCES beers(id),
      quantity INTEGER,
      price INTEGER
    );
  `);
}
seedDB();
