const express = require("express");
const { getAllProducts } = require("../db/products");
const productRouter = express.Router();

// productRouter.use("/", (req, res, next) => {
//   res.send("Product router working");
//   next();
// });

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send({ products });
  } catch (error) {
    res.send(error);
  }
});

module.exports = productRouter;
