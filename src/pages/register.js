import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username)=>{
    const regx=/^[a-zA-Z0-9_]{3,20}$/; // only letters, numbers, underscores and 3-20 chars
    return regx.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username before sending request
    if (!validateUsername(name)) {
      setError('Username must be 3-20 characters long and contain only letters, numbers, or underscores.');
      return;
    }

    try {
      // Send registration request to the backend
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      console.log('Registration successful!');
      setError('');
      // Redirect or show success message
      navigate('/login'); // Change '/login' to your desired route
    } catch (err) {
      setError(err.response?.data?.error || 'Error registering user');
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
