const { Client } = require("pg");
require("dotenv").config();

let client;

if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  client = new Client("postgres://localhost:5432/grace-shopper");
}

client.connect();

module.exports = client;
