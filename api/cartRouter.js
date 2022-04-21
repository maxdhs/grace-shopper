const express = require("express");
const {
  getCart,
  addProductToCart,
  editItemQuantity,
  deleteCartItem,
  getUserIdByCartItemId,
  checkoutCart,
} = require("../db/cart");

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  if (!req.user) {
    res.send({ error: "No token present with request." });
    return;
  }
  const cart = await getCart(req.user.id);
  res.send({ cart });
});

cartRouter.post("/add-product", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No token present with request." });
      return;
    }
    const cartItem = await addProductToCart(req.body);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

cartRouter.post("/edit-item-quantity", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No token present with request." });
      return;
    }
    const cartItem = await editItemQuantity(req.body);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

cartRouter.delete("/delete-item/:cartItemId", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No token present with request." });
      return;
    }
    const info = await getUserIdByCartItemId(req.params.cartItemId);
    if (!info || !info.user_id) {
      res.send({ error: "No cart item found to delete" });
      return;
    }
    if (info.user_id !== req.user.id) {
      res.send({
        error: "You are not the authorized user for this transaction.",
      });
      return;
    }
    const cartItem = await deleteCartItem(req.params.cartItemId);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

cartRouter.patch("/:cartId/checkout", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No token present with request." });
      return;
    }
    const cartItem = await checkoutCart(req.params.cartId);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = cartRouter;
