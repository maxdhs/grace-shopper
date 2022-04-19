const express = require('express');
const { 
  getProducts, 
  createProduct, 
  editProduct, 
  destroyProduct, 
  getProductById, 
  getProductByCategory 
} = require('../db/products');
const productRouter = express.Router();

const { requireAdmin } = require('./utils');

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send({ products });
  } catch (error) {
    next({
      error: error.name,
      message: error.message,
    });
  }
});

productRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.send({ product });
  } catch (error) {
    next({
      error: error.name,
      message: error.message,
    });
  }
});

productRouter.get('/categories/:categoryName', async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const products = await getProductByCategory(categoryName);
    res.send({ products });
  } catch (error) {
    next({
      name: error.name,
      message: error.message,
    });
  }
});

productRouter.post('/', requireAdmin, async (req, res, next) => {
  const { title, price, category, description, inventory } = req.body;

  try {
    const product = await createProduct({
      title,
      price,
      category,
      description,
      inventory,
    });

    if (product) {
      res.send({ product });
    } else {
      next({
        name: 'Create Product Error',
        message: 'There was an error creating the product',
      });
    }
  } catch ({ name, message }) {
    next({
      name,
      message,
    });
  }
});

productRouter.patch('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { title, price, category, description, inventory } = req.body;
  try {
    const product = await editProduct({
      id,
      title,
      price,
      category,
      description,
      inventory,
    });
    res.send({ product });
  } catch (error) {
    next({
      name: error.name,
      message: error.message,
    });
  }
});

productRouter.delete('/:id', requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await destroyProduct(id);
    if (!product) {
      res.send({
        message: 'Product Deleted!',
      });
    }
  } catch (error) {
    next({
      name: error.name,
      message: error.message,
    });
  }
});

module.exports = productRouter;
