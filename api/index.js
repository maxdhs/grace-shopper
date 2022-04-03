const express = require("express");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../db/users");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.send({ error: "bad token" });
    return;
  }
  let user = await getUserByEmail(decoded.email);
  delete user.password;
  req.user = user;
  next();
});

apiRouter.use("/products", productRouter);
apiRouter.use("/users", userRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
