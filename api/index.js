const express = require("express");
const productRouter = require("./productRouter");
const ordersRouter = require("./ordersRouter");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
