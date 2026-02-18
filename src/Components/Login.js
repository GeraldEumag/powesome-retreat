import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Demo role logic
    if (email === 'admin@powesome.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      if (rememberMe) localStorage.setItem('rememberMe', 'true');
      alert('Logged in as Admin');
      navigate('/dashboard');
    } else {
      localStorage.setItem('userRole', 'customer');
      if (rememberMe) localStorage.setItem('rememberMe', 'true');
      alert('Logged in as Customer');
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Pawesome Retreat</h2>
      <p>Management Information System</p>

      <form className="login-form" onSubmit={handleLogin}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="admin@powesome.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <a href="/forgot-password" className="forgot-link">Forgot password?</a>
        </div>

        <button type="submit" className="login-btn">Sign In</button>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Create New Account</a>
        </p>

        <p className="demo-note">Demo: Use any email and password to login</p>
      </form>
    </div>
  );
}

export default Login;