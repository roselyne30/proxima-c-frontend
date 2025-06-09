import React, { useState } from 'react';
import axios from '../../axios';  // Axios instance to communicate with backend
import { useNavigate } from 'react-router-dom';  // Correct import for navigation
import './login.css';  // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
  const navigate = useNavigate();  // Use `useNavigate` for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post('/api/auth/login', { username, password });
      
      // Save the JWT token in localStorage on successful login
      localStorage.setItem('token', response.data.access_token); 

      // Set success message
      setSuccessMessage('Login successful! Redirecting...');

      // Wait for 2 seconds before navigating to the groups page
      setTimeout(() => {
        navigate('/groups');  // Redirect to '/groups' page after a delay
      }, 2000);  // 2 seconds delay
    } catch (err) {
      // If the backend sends an error, display it
      if (err.response) {
        console.error('Login error:', err.response.data);  // Log error data for debugging
        setError(err.response.data.msg || 'Invalid username or password');  // Display backend error message
      } else {
        // If no response, show a network error
        console.error('Login error:', err.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
   <div className='loginWrapper'>
     <div className="login-container">
      <h2>Login</h2>
      
      {/* Show success message if login is successful */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Show error message if login fails */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
   </div>
  );
};

export default Login;
