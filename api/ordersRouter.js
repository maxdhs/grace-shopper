const express = require("express");

const ordersRouter = express.Router();

const { updateOrder } = require("../db/orders");
const { requireUser } = require("./utils");

ordersRouter.delete("/:ordersId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    if (!req.user) {
      throw "Must be logged in";
    } else {
      usersId = req.user.id;

      const {
        rows: [order],
      } = await client.query(
        `
    SELECT * FROM orders
    WHERE id = $1
    `,
        [orderId]
      );

      if (order.userId === usersId) {
        destroyOrder(orderId);

        res.send(order);
        return;
      } else {
        throw "Error deleting order";
      }
    }
  } catch (err) {
    next(err);
  }
});

//updated purchased status of order
ordersRouter.patch("/:ordersId", requireUser, async (req, res, next) => {
  const { isPurchased } = req.body;
  const { orderId } = req.params;
  const id = Number(orderId);
  const toUpdate = { id, isPurchased };

  try {
    if (!req.user) {
      throw "Must be logged in to post";
    } else {
      userId = req.user.id;
      const {
        rows: [order],
      } = await client.query(
        `
    SELECT * FROM orders
    WHERE id = $1
    `,
        [orderId]
      );
      if (order.creatorId === userId) {
        await updateOrder(toUpdate);
        const {
          rows: [Updatedorder],
        } = await client.query(
          `
        SELECT * FROM orders
        WHERE id = $1
        `,
          [orderId]
        );
        console.log(Updatedorder);
        res.send(Updatedorder);
        return;
      }
      throw "error updating order";
    }
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
