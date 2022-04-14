import axios from 'axios';

const API_URL = 'http://localhost:5000/api/goals/';

//Create Goal
const createGoal = async (goalText, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.post(API_URL, { goalText }, config);
  return res.data;
};

//Get Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

//Delete goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.delete(API_URL + goalId, config);
  return res.data;
};
//Update goal
const updateGoal = async (editText, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.put(
    API_URL + editText.id,
    { goalText: editText.text },
    config
  );

  return res.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
};

export default goalService;
