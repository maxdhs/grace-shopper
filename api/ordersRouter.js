const express = require("express");
const {
  getOrderById,
  createOrder,
  destroyOrder,
  updateOrder,
  getAllOrders,
} = require("../db/orders");

const requireUser = require("./utils").default;
const client = require("../db/index");
const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res, next) => {
  const orders = await getAllOrders();
  res.send({ orders });
});

// Get a specific order
// Tested with postman and is working
ordersRouter.get("/:ordersId", async (req, res, next) => {
  const { ordersId } = req.params;
  const order = await getOrderById(ordersId);
  res.send({ order });
});

// Create a new order (with the first product added)
// Tested with postman and is working
ordersRouter.post("/", async (req, res, next) => {
  const { userId, productId, isPurchased } = req.body;
  try {
    const newOrder = await createOrder({ userId, productId, isPurchased });
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

// Delete an existing order
// Tested with postman and is working
ordersRouter.delete("/:ordersId", async (req, res, next) => {
  const { ordersId: id } = req.params;

  try {
    const destroyed = await destroyOrder(id);
    res.send(destroyed);
  } catch (error) {
    next(error);
  }
});

// Update an existing order
// Tested with postman and is working
ordersRouter.patch("/:ordersId", async (req, res, next) => {
  const { count } = req.body;
  const { ordersId: id } = req.params;
  const toUpdate = { id, count };

  try {
    const orders = await updateOrder(toUpdate);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// Add a product to an order
// Tested with postman and is working
ordersRouter.post("/:tempOrderId/products", async (req, res, next) => {
  const { orderId, productId, count } = req.body;
  const { tempOrderId } = req.params;

  try {
    if (tempOrderId === orderId) {
      console.log("order dupe");
      throw false;
    }

    const {
      rows: [checkOrderProducts],
    } = await client.query(
      `
        SELECT * FROM order_products
        WHERE "orderId" = $1
        AND "productId" = $2;
        `,
      [tempOrderId, productId]
    );

    if (checkOrderProducts) {
      throw "order product already exists";
    } else {
      const {
        rows: [order_products],
      } = await client.query(
        `
      INSERT INTO order_products ("orderId","productId",count)
      VALUES($1,$2,$3)
      RETURNING *;
      `,
        [tempOrderId, productId, count]
      );
      res.send(order_products);
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
