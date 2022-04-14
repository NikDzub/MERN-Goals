import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="dashboard">
      <p>Hello </p>
    </div>
  );
};

export default Dashboard;
