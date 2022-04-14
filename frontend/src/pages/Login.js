import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

import Loading from './components/Loading';
import { Logs } from './components/Logs';
import Button from './components/Button';

import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
    if (!email || !password) {
      setLogs('Some fields are missing');
      return;
    }
    const loginData = {
      email,
      password,
    };

    dispatch(login(loginData));
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="register">
      <h3>
        <FaSignInAlt></FaSignInAlt> Login
      </h3>
      <form onSubmit={onSubmit}>
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
          <Button text="Login"></Button>
          <Logs log={logs}></Logs>
        </div>
      </form>
    </div>
  );
};

export default Login;
