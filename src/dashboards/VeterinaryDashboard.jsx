import React, { useState, useEffect } from "react";
import "./VeterinaryDashboard.css";
import "../styles/DashboardTheme.css";
import { VeterinaryProvider } from "../context/VeterinaryContext";

// Import tab components
import AppointmentsTab from "../components/veterinary/AppointmentsTab";
import MedicalHistoryTab from "../components/veterinary/MedicalHistoryTab";
import CustomerProfilesTab from "../components/veterinary/CustomerProfilesTab";
import ReportsTab from "../components/veterinary/ReportsTab";
import { useNavigate } from "react-router-dom"; // ✅ for logout navigation

export default function VeterinaryDashboard() {
  const [activeTab, setActiveTab] = useState("Appointments");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Logout handler
  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      sessionStorage.clear();
      navigate("/login");
    }
  }

  // ✅ CSV Export Helper
  function exportToCSV(data, filename) {
    if (!data || data.length === 0) return;
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map(header => `"${row[header]}"`);
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ✅ Print Helper
  function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const printContents = section.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload to restore React state
  }

  return (
    <VeterinaryProvider>
      <div className="veterinary-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <h2>Veterinary Dashboard</h2>
          <div className="header-actions">
            <span className="user-info">Veterinary User</span>
            <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="dashboard-nav">
          <ul>
            {["Appointments", "Medical History", "Customer Profiles", "Reports"].map(tab => (
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

        {/* Tabs */}
        {activeTab === "Appointments" && (
          <AppointmentsTab exportToCSV={exportToCSV} printSection={printSection} />
        )}
        {activeTab === "Medical History" && (
          <MedicalHistoryTab exportToCSV={exportToCSV} printSection={printSection} />
        )}
        {activeTab === "Customer Profiles" && <CustomerProfilesTab />}
        {activeTab === "Reports" && <ReportsTab />}
      </div>
    </VeterinaryProvider>
  );
}




