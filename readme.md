1. Create a .env file in the root directory with the below info replacing any values that have changed:

DB_PASSWORD=postgres
DB_USER=postgres
DB_NAME=grace-shopper

2. Create a local database called "grace-shopper"

API

/api/users/login POST
req.body = {email: "max@gmail.com", password: "pass123"}
response = {user: {id: 1, email: "max@gmail.com", token: "token123"}}
