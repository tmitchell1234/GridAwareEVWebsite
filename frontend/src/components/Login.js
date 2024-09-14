import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      api_key: apiKey,
      user_email: email,
      user_password: password,
    };

    try {
      const response = await fetch('https://gridawarecharging.com/api/user_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        alert("Login failed. Please check your username or password.");
        return;
      }

      const data = await response.json();
      // console.log('Login successful:', data);

      // Store the JWT in localStorage
      localStorage.setItem('jwt', data.token);

      // Navigate to the Customer Dashboard
      navigate('/CustomerDashboardPage');

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="logincontainer">
      <h1 className="loginTitle">Login</h1>
      <br />
      <div className="login-page">
        <form onSubmit={handleSubmit}>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="loginsubmitbutton" type="submit">Login</button>
          <button className="cancelloginbutton" type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Login;