import React, { useContext, useState } from 'react';
import '../styles/login.css'; // Import the CSS file for styling
// import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import navigation hook
import {AuthContext} from '../context/AuthContext'; // importing the auth provider 

const Login = () => {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Attempting login with:", { identifier, password });
  
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });
  
      const data = await response.json();
      console.log("Response:", response.status, data);
  
      if (response.ok) {
        console.log('Login successful:', data);
        // localStorage.setItem("token", data.token);
        console.log(data);
        login(data.user.name, data.token); // Store login state
        console.log("login details: ", data.user.name)
        console.log("token details",data.token)
        navigate(`/users/${data.user.name}`); // Redirect on success
      } else {
        setError(data.error || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Server error. Please try again.');
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/login', {
  //       identifier, 
  //       password,
  //     });

  //     console.log('Login successful:', response.data);
  //     localStorage.setItem('token', response.data.token); // Store token
  //     setError('');
  //     window.location.href = '/home'; // Redirect on success
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Invalid login credentials');
  //   }


  //   // Perform login (mock API call here, replace with real API)
  //   // const response = await axios.post('http://localhost:8000/api/login',{
  //   //   identifier,
  //   //   password,
  //   // });

  //   // const data = await response.json();

  //   // if (response.ok) {
  //   //   console.log('Login successful:', data);
  //   //   setError('');
  //   //   // Redirect to another page or set authentication state
  //   // } else {
  //   //   setError(data.message || 'Invalid login credentials');
  //   // }
  // };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email or User Name:</label>
          <input
            type="text"
            id="name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
