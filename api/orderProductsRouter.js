const express = require("express");

const requireUser = require("./utils").default;

const orderProductsRouter = express.Router();

const {
  getOrderProductsById,
  destroyOrderProducts,
  updateOrderProducts,
  addProductToOrder,
} = require("../db/order_products");
const { getOrderById } = require("../db/orders");
const { getProductById } = require("../db/products");

orderProductsRouter.post("/:orderId/:productId", async (req, res, next) => {
  const { orderId, productId } = req.params;
  const { count } = req.body;
  try {
    const orderToAddTo = getOrderById(orderId);
    const productToAdd = getProductById(productId);
    const productAddedToOrder = await addProductToOrder({
      orderId,
      productId,
      count,
    });
    res.send(productAddedToOrder);
  } catch (error) {
    next(error);
  }
});

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;
  const { count } = req.body;
  const updateFields = { id, count };

  try {
    const orderProducts = await getOrderProductsById(id);
    const order = await getOrderById(orderProducts.orderId);
    const newOrderProduct = await updateOrderProducts(updateFields);
    res.send(newOrderProduct);
  } catch (error) {
    next(error);
  }
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;
  try {
    const orderProduct = await getOrderProductsById(id);
    if (!orderProduct) {
      throw {
        name: "OrderProductIdError",
        message: "No order_products exist with that id",
      };
    }
    const order = await getOrderById(orderProduct.id);
    await destroyOrderProducts(req.params.orderProductId);
    res.send(orderProduct);
  } catch (error) {
    throw error;
  }
});

module.exports = orderProductsRouter;
