import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export const Logs = (props) => {
  return props.log ? (
    <div className="logs">
      <FaExclamationTriangle></FaExclamationTriangle>
      {props.log + ' '}
    </div>
  ) : (
    <></>
  );
};
