import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.auth;
  });

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('login');
  };
  return (
    <header>
      <div className="logo">
        <Link to={'/'}>
          <FaHome></FaHome>
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button onClick={onLogout}>
                <FaSignInAlt></FaSignInAlt>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}>
                <FaSignInAlt></FaSignInAlt>
                Login
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUserPlus></FaUserPlus>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
