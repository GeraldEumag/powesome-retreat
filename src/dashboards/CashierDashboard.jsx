import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ navigation hook
import "../styles/CashierDashboard.css";
import POS from "../components/POS";
import Inventory from "../components/Inventory";
import InventoryReports from "../components/InventoryReports";

function CashierDashboard() {
  const [activeTab, setActiveTab] = useState("POS");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ clear session/auth info
    localStorage.removeItem("userToken");
    sessionStorage.clear();

    // ✅ redirect to login page
    navigate("/login");
  };

  return (
    <div className={`cashier-dashboard ${darkMode ? "dark" : ""}`}>
      <header className="dashboard-header">
        <h2>Cashier Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">Cashier User</span>
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

      <nav className="dashboard-nav">
        <ul>
          <li
            className={activeTab === "POS" ? "active" : ""}
            onClick={() => setActiveTab("POS")}
          >
            POS
          </li>
          <li
            className={activeTab === "Inventory" ? "active" : ""}
            onClick={() => setActiveTab("Inventory")}
          >
            Inventory
          </li>
          <li
            className={activeTab === "Reports" ? "active" : ""}
            onClick={() => setActiveTab("Reports")}
          >
            Reports
          </li>
        </ul>
      </nav>

      {activeTab === "POS" && <POS setActiveTab={setActiveTab} />}
      {activeTab === "Inventory" && <Inventory />}
      {activeTab === "Reports" && <InventoryReports />}
    </div>
  );
}

export default CashierDashboard;