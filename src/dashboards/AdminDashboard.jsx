import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";   // ✅ correct path since it's in dashboards
import "../styles/DashboardTheme.css";

import UsersTab from "../components/admin/UsersTab";
import CreateUserTab from "../components/admin/CreateUserTab";
import ReportsTab from "../components/admin/ReportsTab";
import LoginHistoryTab from "../components/admin/LoginHistoryTab";
import PayrollTab from "../components/admin/PayrollTab";
import AttendanceTab from "../components/admin/AttendanceTab";

import { LoginContext } from "../context/LoginContext";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Users");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const { addLogoutEvent } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    // ✅ Record logout event
    addLogoutEvent("Admin User", "Administrator");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h2>Powesome Retreat Inc. — Admin Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">Admin User (Administrator)</span>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <ul>
          {["Users", "Create User", "Reports", "Login History", "Payroll", "Attendance"].map(tab => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>

      {/* Dynamic Content */}
      {activeTab === "Users" && <UsersTab />}
      {activeTab === "Create User" && <CreateUserTab />}
      {activeTab === "Reports" && <ReportsTab />}
      {activeTab === "Login History" && <LoginHistoryTab />}
      {activeTab === "Payroll" && <PayrollTab />}
      {activeTab === "Attendance" && <AttendanceTab />}
    </div>
  );
}

export default AdminDashboard;