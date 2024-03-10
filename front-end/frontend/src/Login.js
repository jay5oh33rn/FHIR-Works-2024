import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure this import points to the correct file path
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, user }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post('http://192.168.0.1:8090/login', credentials);
      const { userId } = response.data;

      if (userId !== 0) {
        onLogin(userId);
        navigate('/chat');
        // Implement navigation to the homepage or set logged-in status here
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (err) {
      setError('Login request failed. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <div className="user-id-display">
        {user && <span>User ID: {user}</span>}
      </div>
    </div>
  );
};

export default Login;
