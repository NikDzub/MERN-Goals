const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'here are the goals sir' });
});

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400);
    throw new Error('please add a valid goal');
  }
  res.status(200).json({ message: 'new goal' });
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
