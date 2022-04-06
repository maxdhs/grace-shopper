const express = require('express');
const { useParams } = require('react-router');
const { getProducts } = require('../db/products');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  res.send('Products Page');
});

productRouter.get('/:id', async (req, res) => {
  res.send('Single Product Page');
});

productRouter.get('/catagories/:catagoryName', async (req, res) => {
  const { catagoryName } = useParams();
  res.send(catagoryName + ' page');
});

module.exports = productRouter;
