import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to={'/'}>
          <FaHome></FaHome>
        </Link>
      </div>
      <ul>
        <li>
          <Link to={'/login'}>
            <FaSignInAlt></FaSignInAlt>
            Login
          </Link>
        </li>
        <li>
          <Link to={'/register'}>
            <FaUser></FaUser>
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
