const express = require("express");
const {
  getOrderById,
  createOrder,
  getUserIdByOrderId,
  updateOrder,
} = require("../db/orders");
const {
  addProductToOrder,
  getOrderProductsById,
} = require("../db/order_products");
const { getProductById } = require("../db/products");
const { getUser } = require("../db/users");
const requireUser = require("./utils").default;
const client = require("../db/index");
const ordersRouter = express.Router();

// ordersRouter.use("/", (req, res, next) => {
//   res.send("Order router working");
//   next();
// });

// Get a specific order
ordersRouter.get("/:ordersId", async (req, res, next) => {
  const { ordersId } = req.params;
  const order = await getOrderById(ordersId);
  res.send({ order });
});

// Create a new order (with the first product added)
ordersRouter.post("/", async (req, res, next) => {
  const { userId, productId, count } = req.body;
  try {
    const newOrder = await createOrder({ userId, productId, isPurchased });
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

// Delete an existing order
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
