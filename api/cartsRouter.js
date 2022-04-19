const express = require('express');
const { 
  createCart, 
  getCartById, 
  getCartByUserId, 
  addProductToCart, 
  getCartProducts 
} = require('../db/cart');
const { requireUser } = require('./utils');

const cartsRouter = express.Router();

// cartsRouter.use("/", requireUser, async(req, res, next) => {
//   const {id} = req.user;
//   try {
//     await createCart(id);
//     const newCart = await getCartByUserId(id);
//     res.send({newCart});
//   } catch (error) {
//     res.send({
//       name: error.name,
//       message: error.message
//     })
//   }
// });

cartsRouter.post("/", requireUser, async(req, res, next) => {
  const {id} = req.user;
  const {count, price, productId} = req.body;

  try {
    const cart = await getCartByUserId(id);
    const cartProducts = await addProductToCart(count, price, cart.id, productId);
    res.send({
      cartProducts
    });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message
    })
  }
});

cartsRouter.get('/', requireUser, async (req, res) => {
  try {
    const cart = await getCartProducts();
    console.log(cart);
    res.send({
      cart
    });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message
    })
  }
});




module.exports = cartsRouter;
