import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ import navigate
import "./RegisterForm.css";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" required />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" required />
        </div>

        <div className="form-group">
          <label>Gmail</label>
          <input type="email" placeholder="Enter your Gmail" required />
        </div>

        <div className="form-group">
          <label>Cellphone Number</label>
          <input type="tel" placeholder="Enter your number" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" required /> I agree to the Terms & Conditions
          </label>
        </div>

        <button type="submit" className="register-btn">Register</button>
        
        {/* ✅ Login button now redirects to /login */}
        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;