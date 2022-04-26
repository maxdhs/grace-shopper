const express = require('express');
const {
  createCart,
  getCartById,
  getCartByUserId,
  addProductToCart,
  getCartProducts,
  getCartProductsByUserId,
  editCount,
} = require('../db/cart');
const { requireUser } = require('./utils');

const cartsRouter = express.Router();

cartsRouter.post('/', requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { count, price, productId } = req.body;
  let found = false;
  try {
    const cart = await getCartProductsByUserId(id);
    for (const product of cart.products) {
      console.log(product);
      if (product.productId === productId) {
        found = true;
        const newcount = Number(product.count) + Number(count);
        const response = await editCount(
          newcount,
          product.cartId,
          product.productId
        );
        break;
      }
    }
    if (found) {
      res.send({
        name: 'Found Product',
        message: 'Found product and updated count',
      });
    } else {
      const cartProducts = await addProductToCart(
        count,
        price,
        cart.id,
        productId
      );
      res.send({
        cartProducts,
      });
    }
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

cartsRouter.get('/create', requireUser, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      console.error('No user logged in');
      return;
    }
    const cart = await getCartByUserId(user.id);
    console.log(cart);
    if (cart) {
      console.error('User already has a cart');
      res.send(cart);
      return;
    }
    const newCart = createCart(user.id);
    console.error('Created New Cart');
    res.send(newCart);
    return;
  } catch (error) {
    throw error;
  }
});

cartsRouter.get('/', requireUser, async (req, res) => {
  try {
    const cart = await getCartProductsByUserId(req.user.id);
    console.log(cart);
    res.send({
      cart,
    });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

module.exports = cartsRouter;
