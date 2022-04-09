const express = require("express");
const apiRouter = express.Router();

const productRouter = require("./productRouter");
const ordersRouter = require("./ordersRouter");
const usersRouter = require("./usersRouter");

apiRouter.use("/products", productRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/users", usersRouter);
apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
