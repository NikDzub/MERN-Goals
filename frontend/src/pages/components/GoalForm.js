import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../../features/goals/goalSlice';

import Button from './Button';
import { Logs } from './Logs';

const GoalForm = () => {
  const dispatch = useDispatch();

  const [goalText, setGoalText] = useState('');

  const onChange = (e) => {
    setGoalText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    goalText.trim().length > 0 && dispatch(createGoal(goalText.trim()));
    setGoalText('');
  };
  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <div className="formSection">
          <input
            required
            placeholder="My Next Goal"
            type="text"
            id="goal"
            name="goal"
            value={goalText}
            onChange={onChange}
          ></input>
        </div>
        <div className="formSection">
          <Button text="Share Goal"></Button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
