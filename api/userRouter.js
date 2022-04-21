const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser, getUserByEmail, getUsers } = require("../db/users");
const { getCart } = require("../db/cart");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email.length || !password.length) {
    res.send({ error: "Must provide email and password" });
    return;
  }
  let hashed = await bcrypt.hash(password, 10);
  try {
    const user = await registerUser({ email, hashed });
    let token = await jwt.sign({ ...user }, process.env.JWT_KEY);
    user.token = token;
    user.cart = await getCart(user.id);
    res.send({ user });
  } catch (error) {
    res.send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    res.send({ error: "No user found." });
    return;
  }
  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.send({ error: "Password did not match" });
    return;
  }
  delete user.password;
  const token = await jwt.sign({ ...user }, process.env.JWT_KEY);
  user.token = token;
  user.cart = await getCart(user.id);
  res.send({ user });
});

userRouter.get("/me", (req, res) => {
  if (!req.user) {
    res.send({ error: "No user authentication" });
    return;
  }
  res.send({ user: req.user });
});

userRouter.get("/", async (req, res) => {
  if (!req.user || !req.user.is_admin) {
    res.send({ error: "You must be admin" });
    return;
  }
  const users = await getUsers();
  res.send({ users });
});

module.exports = userRouter;
