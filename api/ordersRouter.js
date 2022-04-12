const express = require("express");
const { getOrderById, createOrder } = require("../db/orders");
const { addProductToOrder } = require("../db/order_products");
const { getUser } = require("../db/users");
const requireUser = require("./utils").default;

const ordersRouter = express.Router();

ordersRouter.get("/:ordersId", async (req, res, next) => {
  try {
    const { ordersId } = req.params;
    const userId = await getUserIdByOrderId(ordersId);
    if (req.user.id !== userId.id) {
      res.status(400).send({
        name: "UsersDontMatch",
        message: "users don't match",
      });
    } else {
      const order = getOrderById(ordersId);
      res.send(order);
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    userId = req.user.id;
    const newOrder = await createOrder({ userId });
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

ordersRouter.delete("/:ordersId", async (req, res, next) => {
  try {
    const { ordersId } = req.params;
    const userId = await getUserIdByOrderId(ordersId);
    if (req.user.id !== userId.id) {
      res.status(400).send({
        name: "UsersDontMatch",
        message: "users don't match",
      });
    } else {
      const destroyed = await destroyOrder(ordersId);
      res.send(destroyed);
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:ordersId", async (req, res, next) => {
  try {
    const { id: userId } = await getUserIdByOrderId(req.params.ordersId);
    if (req.user.id !== userId) {
      res.status(400).send({
        name: "UsersDontMatch",
        message: "users don't match",
      });
    } else {
      // const { count, duration } = req.body;
      const orders = await updateOrder({
        id: req.params.ordersId,
      });
      res.send(orders);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
