import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Account created successfully (demo).');
    navigate('/dashboard');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Pawesome Retreat System</h1>
        <h2>Create New Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="John Smith" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
          />

          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            placeholder="john@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <label>Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            placeholder="0912-345-6789" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Create a password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <label>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm your password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />

          <div className="signup-options">
            <label>
              <input 
                type="checkbox" 
                name="agree" 
                checked={formData.agree} 
                onChange={handleChange} 
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button type="submit" className="signup-btn">Create Account</button>

          <p className="signin-note">
            Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;