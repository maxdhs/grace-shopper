const express = require("express");

const ordersRouter = express.Router();

// const getOrderyById

ordersRouter.delete("/:ordersId", requireUser, async (req, res, next) => {
  try {
    const { ordersId } = req.params;
    const userId = await getUserIdByOrderId(
        ordersId
    );
    if (req.user.id !== userId.id) {
        res.status(400).send({
            name: "UsersDontMatch",
            message: "users don't match",
        });
    } else {
        const destroyed = await destroyOrder(
            ordersId
        );
        res.send(destroyed);
    }
} catch (error) {
    next(error);
}
}
});

ordersRouter.patch(
  "/:ordersId",
  requireUser,
  async (req, res, next) => {
      try {
          const { id: userId } = await getUserIdByOrderId(
              req.params.ordersId
          );
          if (req.user.id !== userId) {
              res.status(400).send({
                  name: "UsersDontMatch",
                  message: "users don't match",
              });
          } else {
              // const { count, duration } = req.body;
              const orders = await updateOrder({
                  id: +req.params.ordersId,
                  // count,
                  // duration,
              });
              res.send(orders);
          }
      } catch (error) {
          next(error);
      }
  }
);
