// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Pawesome Retreat</h2>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/dashboard')}>🏠 Dashboard</li>
        <li onClick={() => navigate('/pets')}>🐾 Pet Profiles</li>
        <li onClick={() => navigate('/reservations')}>🏨 Hotel Reservations</li>
        <li onClick={() => navigate('/veterinary')}>💉 Veterinary</li>
        <li onClick={() => navigate('/pos')}>💳 Point of Sale</li>
        <li onClick={() => navigate('/inventory')}>📦 Inventory</li>
        <li onClick={() => navigate('/users')}>👤 User Management</li>
        <li onClick={() => navigate('/reports')}>📊 Reports</li>
        <li onClick={() => navigate('/login')}>🚪 Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;