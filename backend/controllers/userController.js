const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const User = require('../models/userModel');

//generate jwt
const genJwt = (id) => {
  return jwt.sign({ myId: id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//Public - REGISTER - POST /api/users/register

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error('Some fields are missing');
  }

  //user exists?
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //hash password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  //create user
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      token: genJwt(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Public - LOGIN - POST /api/users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Some fields are missing');
  }
  //check email & password
  const user = await User.findOne({ email });
  if (user && (await bycrypt.compare(password, user.password))) {
    res.status(200).json({
      token: genJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Protected - PROFILE - GET /api/users/profile

const getProfile = asyncHandler(async (req, res) => {
  const { id, fullName } = await User.findById(req.user.id);
  res.json({ profile: fullName });
});

module.exports = { registerUser, loginUser, getProfile };
