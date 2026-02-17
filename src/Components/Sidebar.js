import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Pawesome Retreat Management System</h2>
      <nav>
        <ul>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/pets" className={({ isActive }) => isActive ? 'active' : ''}>Pet Profiles</NavLink></li>
          <li><NavLink to="/reservations" className={({ isActive }) => isActive ? 'active' : ''}>Hotel Reservations</NavLink></li>
          <li><NavLink to="/veterinary" className={({ isActive }) => isActive ? 'active' : ''}>Veterinary</NavLink></li>
          <li><NavLink to="/pos" className={({ isActive }) => isActive ? 'active' : ''}>Point of Sale</NavLink></li>
          <li><NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>Inventory</NavLink></li>
          <li><NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>User Management</NavLink></li>
          <li><NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;