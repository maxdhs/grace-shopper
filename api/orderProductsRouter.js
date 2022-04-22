const express = require("express");

const requireUser = require("./utils");

const orderProductsRouter = express.Router();

const {
  getOrderProductsById,
  destroyOrderProducts,
  updateOrderProducts,
  getAllOrderProducts,
} = require("../db/order_products");
const { getOrderById } = require("../db/orders");

orderProductsRouter.get("/", async (req, res, next) => {
  const order_products = await getAllOrderProducts();
  res.send({ order_products });
});

// Update an order_product
// Tested with postman and is working
orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
  const { orderProductId: id } = req.params;
  const { count } = req.body;
  const updateFields = { id, count };

  try {
    const orderProducts = await getOrderProductsById(id);
    if (!orderProducts)
      throw {
        name: `OrderProductsIdError`,
        message: `No order_products exists with that id`,
      };
    const order = await getOrderById(orderProducts.orderId);
    const newOrderProduct = await updateOrderProducts(updateFields);
    res.send(newOrderProduct);
  } catch (error) {
    next(error);
  }
});

//Delete an order_product
// Tested with postman and is working
orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
  const { orderProductId: id } = req.params;
  try {
    const orderProduct = await getOrderProductsById(id);
    if (!orderProduct) {
      throw {
        name: "OrderProductIdError",
        message: "No order_products exist with that id",
      };
    }
    const order = await getOrderById(orderProduct.orderId);
    await destroyOrderProducts(req.params.orderProductId);
    res.send(orderProduct);
  } catch (error) {
    next(error);
  }
});
module.exports = orderProductsRouter;
