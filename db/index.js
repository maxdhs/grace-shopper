const { Client } = require('pg');

let client;

if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  client = new Client({
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
}

module.exports = { client };
