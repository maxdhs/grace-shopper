const express = require('express');

const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
  res.send('Cart Page');
});

module.exports = cartsRouter;
