const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// GET /api/goals/:id
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  res.status(200).json(goal);
});

// POST /api/goals
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.goalText) {
    res.status(400);
    throw new Error('Goal text cannot be empty');
  }
  const newGoal = await Goal.create({
    goalText: req.body.goalText,
  });
  res.status(200).json(newGoal);
});

// PUT /api/goals/:id
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
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal2Delete = await Goal.findById(req.params.id);
  if (!goal2Delete) {
    res.status(400);
    throw new Error('Goal not found');
  }
  await goal2Delete.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  getGoal,
  postGoal,
  updateGoal,
  deleteGoal,
};
