const express = require("express");
const {
  getOrderById,
  createOrder,
  destroyOrder,
  updateOrder,
  getAllOrders,
  updateUserIdOrdersTable,
  updateOrderPurchased,
} = require("../db/orders");

const requireUser = require("./utils").default;
const client = require("../db/index");
const { updateOrderProducts } = require("../db/order_products");
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
  const { userId } = req.body;
  try {
    const newOrder = await createOrder({ userId });
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
  console.log(+tempOrderId, +productId, +count);
  try {
    // if (tempOrderId === orderId) {
    //   console.log("order dupe");
    //   throw false;
    // }

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
      const orders = await updateOrderProducts(toUpdate);
      res.send(orders);
      // throw "order product already exists";
    } else {
      const {
        rows: [order_products],
      } = await client.query(
        `
      INSERT INTO order_products ("orderId","productId",count)
      VALUES($1,$2,$3)
      RETURNING *;
      `,
        [+tempOrderId, +productId, +count]
      );

      res.send(order_products);

      return;
    }
  } catch (err) {
    next(err);
  }
});

ordersRouter.patch("/:userId/:orderId", async (req, res, next) => {
  const { userId, orderId } = req.params;
  let newUserId;
  if (typeof userId === "string") {
    newUserId = Number(userId);
    console.log("hi", newUserId);
  }
  try {
    const orders = await updateUserIdOrdersTable({ newUserId, orderId });
    console.log(orders);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId", async (req, res, next) => {
  const { orderId: id } = req.params;
  const toUpdate = { id };
  console.log(id);

  try {
    const orders = await updateOrderPurchased(toUpdate);
    console.log(orders);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
