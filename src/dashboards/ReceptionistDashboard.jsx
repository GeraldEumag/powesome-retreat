import React, { useState, useEffect } from "react";
import "./ReceptionistDashboard.css";
import "../styles/DashboardTheme.css";
import { useNavigate } from "react-router-dom";

// Import the three receptionist components
import HotelBooking from "../components/receptionist/HotelBooking";
import GroomingBooking from "../components/receptionist/GroomingBooking";
import CustomerProfile from "../components/receptionist/CustomerProfile"; // ✅ updated
import ReceptionistReport from "../components/receptionist/ReceptionistReport";

function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("Hotel Booking");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("darkMode");
    navigate("/login");
  };

  return (
    <div className="receptionist-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <h2>Receptionist Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">Receptionist User</span>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <ul>
          {["Hotel Booking", "Grooming Booking", "Customer Profiles", "Receptionist Report"].map(tab => (
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
      {activeTab === "Hotel Booking" && (
        <section className="dashboard-section">
          <HotelBooking />
        </section>
      )}

      {activeTab === "Grooming Booking" && (
        <section className="dashboard-section">
          <GroomingBooking />
        </section>
      )}

      {activeTab === "Customer Profiles" && (
        <section className="dashboard-section">
          <CustomerProfile />
        </section>
      )}

      {activeTab === "Receptionist Report" && (
        <section className="dashboard-section">
          <ReceptionistReport />
        </section>
      )}
    </div>
  );
}

export default ReceptionistDashboard;