import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('admin@powesome.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: accept any credentials
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Powesome Retreat</h1>
        <h2>Management Information System</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">Sign In</button>

          <div className="signup-section">
            <p>Don’t have an account?</p>
            <button type="button" className="signup-btn" onClick={handleSignUp}>
              Create New Account
            </button>
          </div>

          <p className="demo-note">Demo: Use any email and password to login</p>
        </form>
      </div>
    </div>
  );
}

export default Login;