import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGoal, deleteGoal } from '../../features/goals/goalSlice';
import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaPen,
  FaTrash,
} from 'react-icons/fa';

const GoalItem = (props) => {
  const [editing, setEditing] = useState(false);
  const [privacy, setPrivacy] = useState(props.goal.private);
  const [goalInfo, setgoalInfo] = useState({
    text: props.goal.goalText,
    id: props.goal._id,
  });
  const { goals, isError, isLoading, isSucsecc } = useSelector((state) => {
    return state.goal;
  });
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setgoalInfo({ text: e.target.value, id: props.goal._id });
  };

  const togglePrivacy = () => {
    dispatch(
      updateGoal({ ...goalInfo, text: props.goal.goalText, private: !privacy })
    );
    setPrivacy(!props.goal.private);
  };
  return (
    <div className="singleGoal">
      <div
        className={
          props.goal.userName == user.fullName
            ? 'singleGoalTitleContainer myGoal'
            : 'singleGoalTitleContainer'
        }
      >
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

      <p className="singleGoalInfo">
        {props.goal.userName !== user.fullName &&
          props.goal.userName + "'s Goal "}
        <br></br>
        {new Date(props.goal.createdAt)
          .toLocaleString('en-US')
          .replace(',', '')
          .replace('AM', '')
          .replace('PM', '')}
      </p>
      {user.fullName === props.goal.userName && (
        <div className="goalIconsContainer">
          <a
            title="Delete Goal"
            onClick={() => {
              dispatch(deleteGoal(props.goal._id));
            }}
          >
            <FaTrash></FaTrash>
          </a>
          {editing ? (
            <>
              <a
                title="Cancle"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                <FaTimes></FaTimes>
              </a>
              <a
                title="Save"
                onClick={() => {
                  goalInfo.text = goalInfo.text.trim();
                  goalInfo.text.trim().length && dispatch(updateGoal(goalInfo));
                }}
              >
                <FaCheck></FaCheck>
              </a>
            </>
          ) : (
            <a
              title="Edit Goal"
              onClick={() => {
                setEditing(!editing);
              }}
            >
              <FaPen></FaPen>
            </a>
          )}
          {privacy ? (
            <FaEyeSlash
              title="Set to Public"
              onClick={togglePrivacy}
            ></FaEyeSlash>
          ) : (
            <FaEye title="Set to Private" onClick={togglePrivacy}></FaEye>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalItem;
