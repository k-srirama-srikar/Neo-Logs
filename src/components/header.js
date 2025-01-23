import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import '../styles/header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Neo Memoirs</Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
