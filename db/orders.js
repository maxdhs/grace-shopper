// createOrder

// getOrder

// getOrdersByUser

// getOrderById

//getUserIdbyOrderId
// const getUser

//updateOrder
async function updateOrder({ id, isPurchased }) {
  try {
    //   if (isPublic) {
    //     await client.query(
    //       `UPDATE routines SET "isPublic" = $1 WHERE id = $2 RETURNING *;`,
    //       [isPublic, id]
    //     );
    //   }
    if (name) {
      await client.query(
        `UPDATE routines SET name = $1 WHERE id = $2 RETURNING *;`,
        [name, id]
      );
    }
    if (goal) {
      await client.query(
        `UPDATE routines SET goal = $1 WHERE id = $2 RETURNING *;`,
        [goal, id]
      );
    }
    const routine = getRoutineById(id);
    return routine;
  } catch (error) {
    throw error;
  }
}

//destroyOrder

module.exports = {
  updateOrder,
};
