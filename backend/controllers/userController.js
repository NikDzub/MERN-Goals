const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const bcrypt = require('bcryptjs/dist/bcrypt');

//POST /api/users/
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Some fields are missing');
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User exists');
  }

  //hash password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  //create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//POST /api/users/login
const loginUser = asyncHandler(async (req, res) =>
  res.json({ message: 'user login' })
);

//GET /api/users/me
const getMe = asyncHandler(async (req, res) =>
  res.json({ message: 'user data' })
);

module.exports = { registerUser, loginUser, getMe };
