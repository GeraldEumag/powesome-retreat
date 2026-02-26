import React, { useState, useEffect } from "react";
import "./ReceptionistDashboard.css";
import "../styles/DashboardTheme.css";

function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("Hotel Booking");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <ul>
          {["Hotel Booking", "Customer Profiles"].map(tab => (
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
          <h3>Hotel Booking</h3>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th><th>Customer</th><th>Pet</th>
                <th>Check-In</th><th>Check-Out</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>HB001</td><td>Juan Dela Cruz</td><td>Dog - Max</td><td>Feb 25, 2026</td><td>Feb 28, 2026</td><td>Confirmed</td></tr>
              <tr><td>HB002</td><td>Maria Santos</td><td>Cat - Luna</td><td>Mar 1, 2026</td><td>Mar 3, 2026</td><td>Pending</td></tr>
            </tbody>
          </table>
        </section>
      )}

      {activeTab === "Customer Profiles" && (
        <section className="dashboard-section">
          <h3>Customer Profiles</h3>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th><th>Name</th><th>Email</th>
                <th>Phone</th><th>Pets</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>C001</td><td>Juan Dela Cruz</td><td>juan@gmail.com</td><td>09171234567</td><td>Dog - Max</td></tr>
              <tr><td>C002</td><td>Maria Santos</td><td>maria@gmail.com</td><td>09179876543</td><td>Cat - Luna</td></tr>
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default ReceptionistDashboard;