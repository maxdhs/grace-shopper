const express = require("express");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", userRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
