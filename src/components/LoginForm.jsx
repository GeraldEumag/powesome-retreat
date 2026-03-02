import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { LoginContext } from "../context/LoginContext";

function LoginForm() {
  const { addLoginEvent } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();

  // ✅ Map role values to match ProtectedRoute allowedRoles
  const roleMap = {
    admin: "Administrator",
    receptionist: "Receptionist",
    cashier: "Cashier",
    veterinary: "Veterinary",
    customer: "Customer",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const mappedRole = roleMap[role];

    // ✅ Record login event with correct role
    addLoginEvent({
      user: `${mappedRole} User`,
      role: mappedRole,
      status: "Success",
      time: new Date().toLocaleString(),
    });

    // ✅ Redirect based on role
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "receptionist":
        navigate("/receptionist");
        break;
      case "cashier":
        navigate("/cashier");
        break;
      case "veterinary":
        navigate("/veterinary");
        break;
      default:
        navigate("/dashboard"); // customer
        break;
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