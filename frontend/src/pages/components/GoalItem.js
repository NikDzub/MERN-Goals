import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGoal, deleteGoal } from '../../features/goals/goalSlice';
import { FaCheck, FaTimes, FaPen, FaTrash } from 'react-icons/fa';

const GoalItem = (props) => {
  const [editing, setEditing] = useState(false);
  const [editText, seteditText] = useState({ text: '', id: props.goal._id });
  const { goals, isError, isLoading } = useSelector((state) => {
    return state.goal;
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    seteditText({ text: e.target.value, id: props.goal._id });
  };

  return (
    <div className="singleGoal">
      <div className="singleGoalTitleContainer">
        {editing ? (
          <h2>
            <input
              placeholder={props.goal.goalText}
              onChange={onChange}
            ></input>
          </h2>
        ) : (
          <h2>{props.goal.goalText}</h2>
        )}
      </div>

      <p>
        Created :{' '}
        {new Date(props.goal.createdAt)
          .toLocaleString('en-US')
          .replace(',', '')
          .replace('AM', '')
          .replace('PM', '')}
      </p>
      <div className="goalIconsContainer">
        <a
          onClick={() => {
            dispatch(deleteGoal(props.goal._id));
          }}
        >
          <FaTrash></FaTrash>
        </a>
        {editing ? (
          <>
            <a
              onClick={() => {
                setEditing(!editing);
              }}
            >
              <FaTimes></FaTimes>
            </a>
            <a
              onClick={() => {
                editText.text = editText.text.trim();
                editText.text.trim().length && dispatch(updateGoal(editText));
              }}
            >
              <FaCheck></FaCheck>
            </a>
          </>
        ) : (
          <a
            onClick={() => {
              setEditing(!editing);
            }}
          >
            <FaPen></FaPen>
          </a>
        )}
      </div>
    </div>
  );
};

export default GoalItem;
