const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.goalText) {
    res.status(400);
    throw new Error('goal text is not valid');
  }
  const goalText = Goal.create({
    goalText: req.body.goalText,
  });
  res.status(200).json({ message: 'new goal created' });
});

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} goal updated` });
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} goal deleted` });
});

module.exports = {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
};
