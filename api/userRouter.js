const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser, getUserByEmail } = require("../db/users");

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
  res.send({ user });
});

module.exports = userRouter;
