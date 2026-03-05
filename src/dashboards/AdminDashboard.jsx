import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import "../styles/DashboardTheme.css";

// ✅ Admin Tabs
import UsersTab from "../components/admin/UsersTab";
import CreateUserTab from "../components/admin/CreateUserTab";
import ReportsTab from "../components/admin/ReportsTab";
import LoginHistoryTab from "../components/admin/LoginHistoryTab";
import PayrollDashboard from "../components/payroll/PayrollDashboard";  
import AttendanceTab from "../components/admin/AttendanceTab";

// ✅ Context
import { LoginContext } from "../context/LoginContext";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Users");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const { addLogoutEvent, currentUser } = useContext(LoginContext);
  const navigate = useNavigate();

  // ✅ Dark Mode toggle persistence
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Logout handler
  const handleLogout = () => {
    addLogoutEvent(
      currentUser?.name || "Admin User",
      currentUser?.role || "Administrator"
    );
    navigate("/login");
  };

  // ✅ Tabs available to Admin only
  const adminTabs = [
    "Users",
    "Create User",
    "Reports",
    "Login History",
    "Payroll",
    "Attendance",
  ];
  const nonAdminTabs = ["Users", "Reports", "Login History"]; // fallback for other roles

  const tabsToShow =
    currentUser?.role === "Administrator" ? adminTabs : nonAdminTabs;

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h2>Powesome Retreat Inc. — Admin Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">
            {currentUser?.name || "Admin User"} (
            {currentUser?.role || "Administrator"})
          </span>
          <button
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <ul>
          {tabsToShow.map((tab) => (
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
      {activeTab === "Create User" &&
        currentUser?.role === "Administrator" && <CreateUserTab />}
      {activeTab === "Reports" && <ReportsTab />}
      {activeTab === "Login History" && <LoginHistoryTab />}
      {activeTab === "Payroll" &&
        currentUser?.role === "Administrator" && <PayrollDashboard />}
      {activeTab === "Attendance" &&
        currentUser?.role === "Administrator" && <AttendanceTab />}
    </div>
  );
}

export default AdminDashboard;