import React, { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import "../styles/DashboardTheme.css";
import { useNavigate } from "react-router-dom";

// Import tab components
import UserInfoTab from "./customerTabs/UserInfoTab";
import BookHotelTab from "./customerTabs/BookHotelTab";
import VetAppointmentTab from "./customerTabs/VetAppointmentTab";
import MyPetsTab from "./customerTabs/MyPetsTab";
import BuyProductsTab from "./customerTabs/BuyProductsTab";
import ChatBotTab from "./customerTabs/ChatBotTab";

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("User Info");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="customer-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <h2>Customer Dashboard</h2>
        <div className="header-actions">
          <span className="user-info">Sarah Johnson</span>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <ul>
          {["User Info", "Book Hotel", "Vet Appointment", "My Pets", "Buy Products", "ChatBot AI"].map(tab => (
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

      {/* Render Tabs */}
      {activeTab === "User Info" && <UserInfoTab />}
      {activeTab === "Book Hotel" && <BookHotelTab />}
      {activeTab === "Vet Appointment" && <VetAppointmentTab />}
      {activeTab === "My Pets" && <MyPetsTab />}
      {activeTab === "Buy Products" && <BuyProductsTab />}
      {activeTab === "ChatBot AI" && <ChatBotTab />}
    </div>
  );
}

export default CustomerDashboard;