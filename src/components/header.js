import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/header.css"; // Import the CSS for styling

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Get user & logout function

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Neo Logs</Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>

          {user ? (
            <>
              {/* If logged in, show Dashboard & Logout */}
              <li>
                <Link to={`/users/${user.username}`}>Dashboard</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              {/* If not logged in, show Login & Register */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
