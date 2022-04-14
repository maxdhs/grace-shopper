require("dotenv").config();
const PORT = process.env.PORT || 3001;

const express = require("express");
const jwt = require("jsonwebtoken");
const apiRouter = require("./api");

const client = require("./db/index");
const { getCartByUserId } = require("./db/orders");
const { getUserById } = require("./db/users");

const app = express();
// app.use(express.json());
// app.use("/api", apiRouter);

app.use(express.json());

app.use(express.static("build"));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const auth = req.headers.authorization.split(" ")[1];
  const _user = await jwt.decode(auth, process.env.JWT_SECRET);
  if (!_user) {
    return next();
  }
  const user = await getUserById(_user.id);
  req.user = user;
  req.user.cart = await getCartByUserId(user.id);
  next();
});

app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT);
  client.connect();
});
