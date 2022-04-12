const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const ordersRouter = require("./ordersRouter");
const orderProductsRouter = require("./orderProductsRouter");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/order_products", orderProductsRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
