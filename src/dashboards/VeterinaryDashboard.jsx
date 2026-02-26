import React, { useState, useEffect } from "react";
import "./VeterinaryDashboard.css";
import "../styles/DashboardTheme.css";

function VeterinaryDashboard() {
  const [activeTab, setActiveTab] = useState("Appointments");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="veterinary-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <h2>Veterinary Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">Veterinary User</span>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <ul>
          {["Appointments", "Medical History"].map(tab => (
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
      {activeTab === "Appointments" && (
        <section className="dashboard-section">
          <h3>Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th><th>Customer</th><th>Pet</th>
                <th>Date</th><th>Time</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>A001</td><td>Juan Dela Cruz</td><td>Dog - Max</td><td>Feb 26, 2026</td><td>10:00 AM</td><td>Confirmed</td></tr>
              <tr><td>A002</td><td>Maria Santos</td><td>Cat - Luna</td><td>Feb 27, 2026</td><td>2:30 PM</td><td>Pending</td></tr>
            </tbody>
          </table>
        </section>
      )}

      {activeTab === "Medical History" && (
        <section className="dashboard-section">
          <h3>Medical History</h3>
          <table>
            <thead>
              <tr>
                <th>Pet ID</th><th>Pet Name</th><th>Owner</th>
                <th>Last Visit</th><th>Diagnosis</th><th>Treatment</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>P001</td><td>Max</td><td>Juan Dela Cruz</td><td>Jan 15, 2026</td><td>Skin Allergy</td><td>Ointment + Vitamins</td></tr>
              <tr><td>P002</td><td>Luna</td><td>Maria Santos</td><td>Feb 10, 2026</td><td>Eye Infection</td><td>Antibiotic Drops</td></tr>
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default VeterinaryDashboard;