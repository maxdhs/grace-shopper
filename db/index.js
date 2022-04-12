require("dotenv").config();
const { Client } = require("pg");

let client;

if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  client = new Client("postgres://localhost:5432/grace-shopper");
}

module.exports = client;

//hello 