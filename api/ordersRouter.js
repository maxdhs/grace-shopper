const express = require("express");

const ordersRouter = express.Router();

// const getOrderyById

ordersRouter.delete("/:ordersId", async (req, res, next) => {
  const { usersId: id } = req.params;
  try {
    const ordersActivity = await getOrderyById(id);
    console.log(routineActivity);
    if (!routineActivity)
      throw {
        name: `RoutineActivityIdError`,
        message: `No routine_activity exists with that id`,
      };
    const routine = await getRoutineById(routineActivity.routineId);
    if (req.user.id === routine.creatorId) {
      await destroyRoutineActivity(req.params.routineActivityId);
      res.send(routineActivity);
    } else {
      next({
        name: `UserOwnerError`,
        message: `User must be the owner to update`,
      });
    }
  } catch (error) {
    throw error;
  }
});
