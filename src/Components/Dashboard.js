import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Select a menu option from the sidebar.</p>
      </div>
    </div>
  );
}

export default Dashboard;