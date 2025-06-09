import React, { useState } from 'react';
import axios from '../../axios';  // Custom Axios instance
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // State to hold success message
  const navigate = useNavigate();  // Initialize useNavigate hook for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the backend
      const response = await axios.post('/api/auth/register', { username, email, password });

      // Set success message and wait 2 seconds before redirecting
      setSuccessMessage('Registration successful! Redirecting to login page...');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');  // Redirect to the login page
      }, 2000);  // 2 seconds delay

    } catch (err) {
      // Handle errors from the backend
      if (err.response) {
        console.error('Registration error:', err.response.data);
        setError(err.response.data.msg || 'Registration failed');
      } else {
        console.error('Registration error:', err.message);
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="registerWrapper">
      <div className="register-container">
      <h2>Register</h2>

      {/* Display success message after successful registration */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display error message if registration fails */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
