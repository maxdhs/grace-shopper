const express = require('express');
const client = require('../db');
const jwt = require('jsonwebtoken');
const { userCheck, createUser, getUser } = require('../db/users.js');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  res.send('User Page');
});

userRouter.get('/register', async (req, res) => {
  res.send('Register Page');
});

userRouter.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userTest = await userCheck(email, username);
    if (!email || !username || !password || userTest) {
      res.send('Error creating user');
      return;
    } else {
      const hashedPassword = jwt.sign(password, process.env.SECRET_KEY);
      const user = await createUser(email, username, hashedPassword);
      res.send('User Created  ' + user);
      return;
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

userRouter.get('/login', async (req, res) => {
  res.send('Login Page');
});

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser(username, password);

    if (!user) {
      res.send({ error: 'No user found' });
    }
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.SECRET_KEY
    );
    res.send({ token });
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
