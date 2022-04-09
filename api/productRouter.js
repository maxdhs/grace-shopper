const express = require('express');
const {
  getProducts,
  getProductsInCatagory,
  getProductById,
  createProduct,
  destroyProduct,
  editProduct,
} = require('../db/products');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.send('products page' + products);
  } catch (error) {
    res.send(error);
  }
});

productRouter.post('/', async (req, res) => {
  if (req.user) {
    if (req.user.isAdmin === true) {
      try {
        const product = await createProduct(req.body);
        res.send(product);
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send('Only admins may add a product');
    }
  } else {
    res.send('Error: no user logged in.');
  }
});

productRouter.delete('/:id', async (req, res) => {
  if (req.user) {
    if (req.user.isAdmin === true) {
      try {
        const { id } = req.params;
        const deletedProduct = await destroyProduct(id);
        if (deletedProduct[0]) {
          console.error('Error deleting product');
          res.send('error deleting product');
        } else {
          res.send('product Deleted');
        }
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send('Only admins may remove a product');
    }
  } else {
    res.send({ name: 'NoUserError', message: 'Error: no user logged in.' });
  }
});

productRouter.patch('/:id', async (req, res) => {
  if (req.user) {
    if (req.user.isAdmin === true) {
      try {
        const { id } = req.params;
        const { name, description, price, catagory, inventory } = req.body;
        const updateProduct = await editProduct(
          id,
          name,
          description,
          price,
          catagory,
          inventory
        );
        res.send(updateProduct);
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send('Only admins may edit a product');
    }
  } else {
    res.send('Error: no user logged in.');
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.send('Single Product Page ' + product);
  } catch (error) {
    res.send(error);
  }
});

productRouter.get('/catagories/:catagoryName', async (req, res) => {
  try {
    const { catagoryName } = req.params;
    const products = await getProductsInCatagory(catagoryName);
    res.send(catagoryName + ' page ' + products);
  } catch (error) {
    res.send(error);
  }
});

module.exports = productRouter;
