const express = require("express");
const jwt = require("jsonwebtoken");
const { getCart, getOrders } = require("../db/cart");
const { getUserByEmail } = require("../db/users");
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.send({ error: "bad token" });
    return;
  }
  let user = await getUserByEmail(decoded.email);
  if (!user) {
    next();
    return;
  }
  delete user.password;
  req.user = user;
  req.user.cart = await getCart(req.user.id);
  req.user.orders = await getOrders(req.user.id);
  next();
});

apiRouter.use("/products", productRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/cart", cartRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
