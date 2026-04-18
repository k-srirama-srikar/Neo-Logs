import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/header.css"; // Import the CSS for styling

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Get user & logout function
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Neo Logs</Link>
      </div>
      
      <button 
        className="hamburger" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
      >
        &#9776;
      </button>

      <nav className={`navbar ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to={`/users/${user.username}`} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
