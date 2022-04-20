const express = require("express");

const usersRouter = express.Router();
const {
  createUser,
  getUserByEmail,
  getUser,
  getUserById,
} = require("../db/users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const requireUser = require("./utils");

// User register
// Tested with Postman and is working
usersRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const _user = await getUserByEmail(email);
    if (_user) {
      res.send({
        name: "EmailExistsError",
        message: "A user by that email already exists",
      });
      return;
    }
    if (password.length < 8) {
      res.send({
        name: "PasswordLengthError",
        message: "Password is too short, must be at least 8 characters!",
      });
      return;
    }
    const user = await createUser({ email, password });
    res.send({
      user,
    });
  } catch (error) {
    next(error);
  }
});

// User login
// Tested with postman and is currently working
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
    return;
  }

  try {
    const user = await getUser({ email, password });

    if (user) {
      const token = jwt.sign({ id: user.id, email }, JWT_SECRET);

      res.send({ message: "You're logged in!", token, user });
      return;
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const id = req.user.id;
    if (id) {
      const user = await getUserById(id);
      res.send({ user });
    }
  } catch (error) {
    res.send({ error: "bad token" });
  }
});

// Get all orders for a user
// Tested with postman and is working
usersRouter.get("/:userId/orders", async (req, res, next) => {
  const { userId: id } = req.params;

  try {
    const user = await getUserById(id);

    if (user) {
      const orders = await getOrdersByUser(id);
      res.send(orders);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = usersRouter;
