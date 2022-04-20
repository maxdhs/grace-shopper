const express = require("express");
const {
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    getOrdersByFulfilled,
} = require("../db/index");

const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.send({ orders });
    } catch (error) {
        next(error);
    }
});

// ordersRouter.get("/orders", async (req, res, next) => {
//   try {
//     const orders = await getAllOrders();
//     res.send({ orders });
//   } catch (error) {
//     next(error);
//   }
// });

// ordersRouter.post("/createorder", async (req, res, next) => {
//     const {user_id, fulfilled, } = req.body;
//     try {
//       const order = await createOrder({

//       });
//       res.send({ order });
//     } catch (error) {
//       next(error);
//     }
//   });

module.exports = ordersRouter;
