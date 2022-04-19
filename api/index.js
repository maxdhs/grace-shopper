const express = require("express");
const cartsRouter = require("./cartsRouter");
const productRouter = require("./productRouter");
const reviewsRouter = require("./reviewsRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/cart", cartsRouter);

apiRouter.get("/", (req, res) => {
	res.send("api router working");
});

module.exports = apiRouter;
