const express = require('express');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  res.send('User Page');
});

userRouter.get('/register', async (req, res) => {
  res.send('Register Page');
});

userRouter.get('/login', async (req, res) => {
  res.send('Login Page');
});
module.exports = userRouter;
