const express = require("express");
const { getAllProducts } = require("../db/products");

const productRouter = express.Router();

// Tested route with Postman - is working
productRouter.get("/", async (req, res) => {
  const products = await getAllProducts();
  console.log(products);
  res.send({ products });
});

module.exports = productRouter;
