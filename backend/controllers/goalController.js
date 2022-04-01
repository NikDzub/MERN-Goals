const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//match user w goal
const goalMatchUser = async (g, u) => {
  if (!u) {
    res.status(401);
    throw new Error('User not found');
  }

  //current users goal?
  if (g.user.toString() !== u.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
};

//Protected - GET ALL GOALS - GET /api/goals

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//Protected - GET A GOAL - GET /api/goals/:id

const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  const curUser = await User.findById(req.user.id);

  goalMatchUser(goal, curUser);

  res.status(200).json(goal);
});

//Protected - POST A GOAL - POST /api/goals

const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.goalText) {
    res.status(400);
    throw new Error('Goal text cannot be empty');
  }
  const newGoal = await Goal.create({
    user: req.user.id,
    goalText: req.body.goalText,
  });
  res.status(200).json(newGoal);
});

//Protected - UPDATE A GOAL - PUT /api/goals/:id

const updateGoal = asyncHandler(async (req, res) => {
  if (!req.body.goalText) {
    res.status(400);
    throw new Error('Goal text cannot be empty');
  }
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  const curUser = await User.findById(req.user.id);

  goalMatchUser(goal, curUser);

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//Protected - DELETE A GOAL - DELETE /api/goals/:id

const deleteGoal = asyncHandler(async (req, res) => {
  const goal2Delete = await Goal.findById(req.params.id);
  if (!goal2Delete) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const curUser = await User.findById(req.user.id);

  goalMatchUser(goal2Delete, curUser);

  await goal2Delete.remove();

  res.status(200).json({ removed: req.params.id });
});

module.exports = {
  getGoals,
  getGoal,
  postGoal,
  updateGoal,
  deleteGoal,
};
