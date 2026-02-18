import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');   // clear role
    localStorage.removeItem('rememberMe'); // optional clear
    alert('You have been logged out.');
    navigate('/login'); // redirect to login page
  };

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
          {/* ✅ Logout button */}
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;