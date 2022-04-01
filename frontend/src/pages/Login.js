import React from 'react';
import { useState, useEffect } from 'react';

import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
