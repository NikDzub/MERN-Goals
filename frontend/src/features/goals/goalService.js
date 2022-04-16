import axios from 'axios';

const API_URL = '/api/goals/';

//Create Goal
const createGoal = async (goalText, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.post(
    API_URL,
    { goalText, userName: 'who', likes: {} },
    config
  );
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
  res.data.sort((goal1, goal2) => {
    return (
      new Date(goal2.createdAt).getTime() - new Date(goal1.createdAt).getTime()
    );
  });
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
const updateGoal = async (goalInfo, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const res = await axios.put(
    API_URL + goalInfo.id,
    { goalText: goalInfo.text, private: goalInfo.private },
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
