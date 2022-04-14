import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import GoalForm from './components/GoalForm';
import Loading from './components/Loading';
import GoalItem from './components/GoalItem';
import { getGoals, reset } from '../features/goals/goalSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.auth;
  });
  const { goals, isLoading, isError, message } = useSelector((state) => {
    return state.goal;
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (isError) {
      //console.log(message);
    }
    dispatch(getGoals());
  }, [user, navigate, message]);

  const [uiGoals, setUiGoals] = useState(goals);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (user) {
    return (
      <div className="dashboard">
        <div className="opener">
          <h1>Hey, {user.fullName}</h1>
          {goals.length < 1 ? (
            <p>
              Setting goals is the first step in turning the invisible into the
              visible !
            </p>
          ) : (
            <p>A goal properly set is halfway reached !</p>
          )}
        </div>
        <GoalForm></GoalForm>
        <div>
          {goals.length > 0 && (
            <div className="goalsContainer">
              {goals.map((goal) => {
                return <GoalItem key={goal._id} goal={goal}></GoalItem>;
              })}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <p>Error</p>;
  }
};
export default Dashboard;
