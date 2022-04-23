const express = require('express');
const client = require('../db');
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUser,
  getAllUsers,
} = require('../db/users.js');
const { requireAdmin } = require('./utils');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    if(req.user) {
      res.send(req.user);
      return
    }
  } catch (error) {
    res.send({
      message: error.message
    })
  }
});

userRouter.get('/me', async (req, res) => {
  try {
    req.user ? res.send(req.user) : res.send('Error: No user logged in.');
  } catch (error) {
    throw error;
  }
});

userRouter.get('/view', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.send({ users });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

userRouter.get('/view/:username', requireAdmin, async (req, res, next) => {
  const { username } = req.params;
  try {
    const users = await getUserByUsername(username);
    delete users.password;
    res.send({ users });
  } catch (error) {
    next({ error });
  }
});

userRouter.get('/register', async (req, res) => {
  res.send('Register Page');
});

userRouter.post('/register', async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user) {
      next({
        name: 'UserExistsError',
        message: 'Username already exists',
      });
      return;
    }

    const userEmail = await getUserByEmail(email);

    if (userEmail) {
      next({
        name: 'UserEmailExistsError',
        message: 'User with that email already exists',
      });
      return;
    }

    const newUser = await createUser({ email, username, password });

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1w',
      }
    );

    res.send({
      user: newUser,
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

userRouter.get('/login', async (req, res) => {
  res.send('Login Page');
});

userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    });
  }

  try {
    const user = await getUser({ username, password });

    if (!user) {
      res.send({ error: 'No user found' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.SECRET_KEY
    );

    user.token = token;

    res.send({
      message: "you're logged in!!!",
      token,
    });
  } catch (error) {
    throw error;
  }
});
module.exports = userRouter;
