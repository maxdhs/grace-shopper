const express = require("express");

const usersRouter = express.Router();
const {
  createUser,
  getUserByEmail,
  getUser,
  getUserById,
} = require("../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const requireUser = require("./utils").default;

// User register
// Tested with Postman - is currently working
usersRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const _user = await getUserByEmail(email);
    // console.log(_user[0]);
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
    // console.log(user);

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

//
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
