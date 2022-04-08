const express = require('express');
const {
  getProducts,
  getProductsInCatagory,
  getSingleProduct,
} = require('../db/products');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await getProducts();
  res.send('products page' + products);
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await getSingleProduct(id);
  res.send('Single Product Page ' + product);
});

productRouter.get('/catagories/:catagoryName', async (req, res) => {
  const { catagoryName } = req.params;
  const products = await getProductsInCatagory(catagoryName);
  res.send(catagoryName + ' page ' + products);
});

module.exports = productRouter;
