require("dotenv").config();
const { Client } = require("pg");

let client;

if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  client = new Client({
    password: "bones101",
    database: "grace-shopper",
    user: "postgres",
  });
}

client.connect();

module.exports = client;

//hello 