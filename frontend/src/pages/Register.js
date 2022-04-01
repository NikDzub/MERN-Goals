import React from 'react';
import { useState, useEffect } from 'react';

import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { fullName, email, password, password2 } = formData;

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
        <FaUserPlus></FaUserPlus> Create an account
      </h3>
      <form onSubmit={onSubmit}>
        <div className="formSection">
          <input
            placeholder="Full Name"
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
