require("dotenv").config();
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const rebuildDB = require("../db/seed");

const client = require("../db/index");
const { getAllProducts, getProductById } = require("../db/products");
const {
  getOrdersByUser,
  createOrder,
  getOrderById,
  updateOrder,
  destroyOrder,
} = require("../db/orders");
const { createUser, getUser, getUserById } = require("../db/users");
const {
  getOrderProductsByOrder,
  addProductToOrder,
  updateOrderProducts,
  destroyOrderProducts,
} = require("../db/order_products");

describe("Database", () => {
  //   beforeAll(async () => {
  //     await rebuildDB();
  //   });
  //   afterAll(async () => {
  //     await client.end();
  //   });
  describe("Users", () => {
    let userToCreateAndUpdate, queriedUser;
    let userCredentials = { email: "lexi@gmail.com", password: "12345678" };
    describe("createUser({ email, password })", () => {
      beforeAll(async () => {
        userToCreateAndUpdate = await createUser(userCredentials);
        const { rows } = await client.query(
          `SELECT * FROM users WHERE email = $1`,
          [userCredentials.email]
        );
        queriedUser = rows[0];
      });
      it("Creates the user", async () => {
        expect(userToCreateAndUpdate.email).toBe(userCredentials.email);
        expect(queriedUser.email).toBe(userCredentials.email);
      });
      it("Does not store plaintext password in the database", async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it("Hashes the password (salted 10 times) before storing it to the database", async () => {
        const hashedVersion = bcrypt.compareSync(
          userCredentials.password,
          queriedUser.password
        );
        expect(hashedVersion).toBe(true);
      });
      it("Does NOT return the password", async () => {
        expect(userToCreateAndUpdate.password).toBeFalsy();
      });
    });
    describe("getUser({ email, password })", () => {
      let verifiedUser;
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials);
      });
      it("Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)", async () => {
        const unVerifiedUser = await getUser({
          email: userCredentials.email,
          password: "badPassword",
        });
        expect(verifiedUser).toBeTruthy();
        expect(verifiedUser.email).toBe(userCredentials.email);
        expect(unVerifiedUser).toBeFalsy();
      });
      it("Does NOT return the password", async () => {
        expect(verifiedUser.password).toBeFalsy();
      });
    });
    describe("getUserById", () => {
      it("Gets a user based on the user Id", async () => {
        const user = await getUserById(userToCreateAndUpdate.id);
        expect(user).toBeTruthy();
        expect(user.id).toBe(userToCreateAndUpdate.id);
      });
    });
  });
  describe("Products", () => {
    describe("getAllProducts", () => {
      it("selects and returns an array of all products", async () => {
        const products = await getAllProducts();
        const { rows: productsFromDB } = await client.query(`
        SELECT * FROM products;
      `);
        expect(products).toEqual(productsFromDB);
      });
    });
    // describe('createProduct({ name, description })', () => {
    //   it('Creates and returns the new activity', async () => {
    //     const activityToCreate = {
    //       name: 'elliptical',
    //       description: 'using the elliptical machine',
    //     };
    //     const createdActivity = await createActivity(activityToCreate);
    //     expect(createdActivity.name).toBe(activityToCreate.name);
    //     expect(createdActivity.description).toBe(activityToCreate.description);
    //   });
    // });
    // describe('updateActivity', () => {
    //   it('Updates name and description of an activity without affecting the ID. Returns the updated Activity.', async () => {
    //     const [activityToUpdate] = await getAllActivities();
    //     activityToUpdate.name = 'standing barbell curl';
    //     const activity = await updateActivity(activityToUpdate);
    //     expect(activity).toEqual(activityToUpdate);
    //   });
    // });
  });
  describe("Orders", () => {
    let orderToCreateAndUpdate;
    describe("getOrderById", () => {
      it("gets products by their id", async () => {
        const product = await getProductById(1);
        expect(product).toBeTruthy();
      });
    });
    // describe("getAllOrders", () => {
    //   let order;

    //   it("selects and returns an array of order, includes their products", async () => {
    //     expect(order).toEqual(
    //       expect.objectContaining({
    //         id: expect.any(Number),
    //         userId: expect.any(Number),
    //         productId: expect.any(Number),
    //         isPurchased: expect.any(Boolean),
    //         products: expect.any(Array),
    //       })
    //     );
    //   });
    //   it("includes email from users join", async () => {
    //     expect(order).toEqual(
    //       expect.objectContaining({
    //         creatorName: expect.any(String),
    //       })
    //     );
    //   });
    //   it("includes count on products, from order_products join", async () => {
    //     const {
    //       products: [firstProduct],
    //     } = order;
    //     expect(firstProduct).toEqual(
    //       expect.objectContaining({
    //         count: expect.any(Number),
    //       })
    //     );
    //   });
    // });
    // describe("getAllPublicRoutines", () => {
    //   let routine;
    //   beforeAll(async () => {
    //     [routine] = await getAllPublicRoutines();
    //   });
    //   it("selects and returns an array of all public routines, includes their activities", async () => {
    //     expect(routine).toEqual(
    //       expect.objectContaining({
    //         id: expect.any(Number),
    //         creatorId: expect.any(Number),
    //         isPublic: expect.any(Boolean),
    //         name: expect.any(String),
    //         goal: expect.any(String),
    //         activities: expect.any(Array),
    //       })
    //     );
    //     expect(routine.isPublic).toBe(true);
    //   });
    //   it("includes username, from users join, aliased as creatorName", async () => {
    //     expect(routine).toEqual(
    //       expect.objectContaining({
    //         creatorName: expect.any(String),
    //       })
    //     );
    //   });
    //   it("includes duration and count on activities, from routine_activities join", async () => {
    //     const {
    //       activities: [firstActivity],
    //     } = routine;
    //     expect(firstActivity).toEqual(
    //       expect.objectContaining({
    //         duration: expect.any(Number),
    //         count: expect.any(Number),
    //       })
    //     );
    //   });
    // });
    // describe("getOrdersByUser", () => {
    //   let order, user;
    //   beforeAll(async () => {
    //     user = await getUserById(1);
    //     console.log(user.id);
    //     order = await getOrdersByUser(user.id);
    //     console.log(order);
    //   });
    //   it("selects and return an array of all orders made by user, includes their products", async () => {
    //     expect(order).toEqual(
    //       expect.objectContaining({
    //         email: expect.any(String),
    //         id: expect.any(Number),
    //         userId: expect.any(Number),
    //         productId: expect.any(Number),
    //         isPurchased: expect.any(Boolean),
    //         products: expect.any(Array),
    //       })
    //     );
    //     expect(order.userId).toBe(user.id);
    //   });
    //   it("includes count on products, from order_products join", async () => {
    //     const {
    //       products: [firstProduct],
    //     } = order;
    //     expect(firstProduct).toEqual(
    //       expect.objectContaining({
    //         count: expect.any(Number),
    //       })
    //     );
    //   });
    // });
    // describe("getPublicRoutinesByUser", () => {
    //   let routine, user;
    //   beforeAll(async () => {
    //     user = await getUserById(1);
    //     [routine] = await getPublicRoutinesByUser(user.email);
    //   });
    //   it("selects and returns an array of all order made by user, includes their products", async () => {
    //     expect(order).toEqual(
    //       expect.objectContaining({
    //         id: expect.any(Number),
    //         userId: expect.any(Number),
    //         productId: expect.any(Number),
    //         isPurchased: expect.any(Boolean),
    //         products: expect.any(Array),
    //       })
    //     );
    //     expect(routine.creatorId).toBe(user.id);
    //     expect(routine.isPublic).toBe(true);
    //   });
    //   it("includes username, from users join, aliased as creatorName", async () => {
    //     expect(routine).toEqual(
    //       expect.objectContaining({
    //         creatorName: expect.any(String),
    //       })
    //     );
    //   });
    //   it("includes duration and count on activities, from routine_activities join", async () => {
    //     const {
    //       activities: [firstActivity],
    //     } = routine;
    //     expect(firstActivity).toEqual(
    //       expect.objectContaining({
    //         duration: expect.any(Number),
    //         count: expect.any(Number),
    //       })
    //     );
    //   });
    // });
    // describe("getPublicRoutinesByActivity", () => {
    //   let routine, activity;
    //   beforeAll(async () => {
    //     activity = await getActivityById(3);
    //     [routine] = await getPublicRoutinesByActivity(activity);
    //   });
    //   it("selects and return an array of public routines which have a specific activityId in their routine_activities join, includes their activities", async () => {
    //     expect(routine).toEqual(
    //       expect.objectContaining({
    //         id: expect.any(Number),
    //         creatorId: expect.any(Number),
    //         isPublic: expect.any(Boolean),
    //         name: expect.any(String),
    //         goal: expect.any(String),
    //         activities: expect.any(Array),
    //       })
    //     );
    //     expect(routine.isPublic).toBe(true);
    //   });
    //   it("includes username, from users join, aliased as creatorName", async () => {
    //     expect(routine).toEqual(
    //       expect.objectContaining({
    //         creatorName: expect.any(String),
    //       })
    //     );
    //   });
    //   it("includes duration and count on activities, from routine_activities join", async () => {
    //     const {
    //       activities: [firstActivity],
    //     } = routine;
    //     expect(firstActivity).toEqual(
    //       expect.objectContaining({
    //         duration: expect.any(Number),
    //         count: expect.any(Number),
    //       })
    //     );
    //   });
    // });
    describe("createOrder", () => {
      it("creates and returns the new order", async () => {
        orderToCreateAndUpdate = await createOrder({
          userId: 2,
          isPurchased: true,
        });
        const queriedOrder = await getOrderById(orderToCreateAndUpdate.id);
        expect(orderToCreateAndUpdate).toEqual(queriedOrder);
      });
    });
    describe("updateOrder", () => {
      let queriedOrder;
      beforeAll(async () => {
        orderToCreateAndUpdate = await updateOrder({
          id: orderToCreateAndUpdate.id,
          count: 3,
        });
        queriedOrder = await getOrderById(orderToCreateAndUpdate.id);
      });
      it("Returns the updated order", async () => {
        expect(orderToCreateAndUpdate).toBeTruthy();
      });
      it("Finds the order with id equal to the passed in id. Does not update the order id.", async () => {
        expect(orderToCreateAndUpdate.id).toBe(queriedOrder.id);
      });
      it("Updates the count as necessary", async () => {
        expect(orderToCreateAndUpdate.count).toBe(queriedOrder.count);
      });
    });
    describe("destroyOrder", () => {
      it("removes order from database", async () => {
        await destroyOrder(orderToCreateAndUpdate.id);
        const {
          rows: [order],
        } = await client.query(
          `
          SELECT * 
          FROM orders
          WHERE id = $1;
        `,
          [orderToCreateAndUpdate.id]
        );
        expect(order).toBeFalsy();
      });
      it("Deletes all the order_products whose order is the one being deleted.", async () => {
        const queriedOrderProducts = await getOrderProductsByOrder(
          orderToCreateAndUpdate
        );
        expect(queriedOrderProducts.length).toBe(0);
      });
    });
  });
  describe("Order Products", () => {
    const orderProductsData = {
      orderId: 4,
      productId: 8,
      count: 10,
    };
    let orderProductsToCreateAndUpdate;
    describe("addProductToOrder({ orderId, productId, count })", () => {
      it("creates a new order_product, and returns it", async () => {
        orderProductsToCreateAndUpdate = await addProductToOrder(
          orderProductsData
        );
        expect(orderProductsToCreateAndUpdate.orderId).toBe(
          orderProductsData.orderId
        );
        expect(orderProductsToCreateAndUpdate.productId).toBe(
          orderProductsData.productId
        );
        expect(orderProductsToCreateAndUpdate.count).toBe(
          orderProductsData.count
        );
      });
    });
    describe("updateOrderProducts({ id, count })", () => {
      it("Finds the order with id equal to the passed in id. Updates the count as necessary.", async () => {
        const newOrderProductData = {
          id: orderProductsToCreateAndUpdate.id,
          count: 15,
        };
        orderProductsToCreateAndUpdate = await updateOrderProducts(
          newOrderProductData
        );
        expect(orderProductsToCreateAndUpdate.id).toBe(newOrderProductData.id);
        expect(orderProductsToCreateAndUpdate.count).toBe(
          newOrderProductData.count
        );
      });
    });
    describe("destroyOrderProducts(id)", () => {
      it("remove order_products from database", async () => {
        const deletedOrder = await destroyOrderProducts(
          orderProductsToCreateAndUpdate.id
        );
        expect(deletedOrder.id).toBe(orderProductsToCreateAndUpdate.id);
        const { rows } = await client.query(`
          SELECT * FROM order_products
          WHERE id = ${deletedOrder.id}
        `);
        expect(rows.length).toBe(0);
      });
    });
  });
});
