import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { LoginContext } from "../context/LoginContext";

function LoginForm() {
  const { addLoginEvent } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Record login event
    addLoginEvent({
      user: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      role: role.charAt(0).toUpperCase() + role.slice(1),
      status: "Success",
      time: new Date().toLocaleString(),
    });

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "receptionist") {
      navigate("/receptionist");
    } else if (role === "cashier") {
      navigate("/cashier");
    } else if (role === "veterinary") {
      navigate("/veterinary");
    } else {
      navigate("/dashboard"); // customer
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Gmail</label>
          <input type="email" placeholder="Enter your Gmail" required />
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

        {/* Role Selection */}
        <div className="form-group">
          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
            <option value="cashier">Cashier</option>
            <option value="veterinary">Veterinary</option>
          </select>
        </div>

        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember Password
          </label>
          <button type="button" className="forgot-btn">Forgot Password?</button>
        </div>

        <button type="submit" className="login-btn">Login</button>
        <button type="button" className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginForm;