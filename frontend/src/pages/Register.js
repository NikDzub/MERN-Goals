import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

import Loading from './components/Loading';
import Button from './components/Button';

import { FaUserPlus } from 'react-icons/fa';
import { Logs } from './components/Logs';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: '',
  });
  const { fullName, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );
  const [logs, setLogs] = useState(message);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (isError) {
      setLogs(() => {
        return message;
      });
    }
    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !fullName ||
      fullName.trim().length < 1 ||
      !email ||
      !password ||
      !password2
    ) {
      setLogs('Some fields are missing');
      return;
    }
    if (password !== password2) {
      setLogs('Passwords dont match');
      return;
    } else {
      const registerData = {
        fullName,
        email,
        password,
      };
      dispatch(register(registerData));
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="register">
      <h3>
        <FaUserPlus></FaUserPlus> Create new account
      </h3>
      <form onSubmit={onSubmit}>
        <div className="formSection">
          <input
            placeholder="Username"
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={onChange}
          ></input>
        </div>
        <div className="formSection">
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          ></input>
        </div>
        <div className="formSection">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          ></input>
        </div>
        <div className="formSection">
          <input
            placeholder="Confirm password"
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
          ></input>
        </div>
        <div className="formSection">
          <Button text="Register"></Button>
          <Logs log={logs}></Logs>
        </div>
      </form>
    </div>
  );
};

export default Register;
