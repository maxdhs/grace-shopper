const express = require('express');
const { getProducts } = require('../db/products');
const productRouter = express.Router();

productRouter.get("/", async(req, res) => {
  try {
    const products = await getProducts();
    res.send({products});
  } catch (error) {
    throw error;
  }
})


module.exports = productRouter;
