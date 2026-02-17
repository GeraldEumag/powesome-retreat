// src/Components/Reports.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Reports.css';

function Reports() {
  const [reportPeriod] = useState({
    from: '2026-01-01',
    to: '2026-02-12',
    filter: 'Last 7 Days'
  });

  const [metrics] = useState({
    totalRevenue: 782000,
    totalBookings: 391,
    newCustomers: 127,
    avgRevenuePerDay: 18200
  });

  return (
    <div className="reports-container">
      <Sidebar />
      <div className="reports-content">
        <h1>Reports & Analytics</h1>
        <p>Business insights and performance metrics</p>

        {/* Report Period */}
        <div className="report-period">
          <span>From: {reportPeriod.from}</span>
          <span>To: {reportPeriod.to}</span>
          <span>Filter: {reportPeriod.filter}</span>
        </div>

        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Revenue</h3>
            <p>₱{metrics.totalRevenue.toLocaleString()}</p>
            <small>↑ +18% vs last period</small>
          </div>
          <div className="metric-card">
            <h3>Total Bookings</h3>
            <p>{metrics.totalBookings}</p>
            <small>↑ +24% vs last period</small>
          </div>
          <div className="metric-card">
            <h3>New Customers</h3>
            <p>{metrics.newCustomers}</p>
            <small>↑ +15% vs last period</small>
          </div>
          <div className="metric-card">
            <h3>Avg Revenue/Day</h3>
            <p>₱{metrics.avgRevenuePerDay.toLocaleString()}</p>
            <small>↑ +12% vs last period</small>
          </div>
        </div>

        {/* Charts placeholders */}
        <div className="charts-section">
          <div className="chart-box">
            <h3>Revenue by Service</h3>
            <p>[Chart Placeholder]</p>
          </div>
          <div className="chart-box">
            <h3>Revenue Distribution</h3>
            <p>[Chart Placeholder]</p>
          </div>
        </div>

        {/* Export Button */}
        <button className="export-btn">Export Report</button>
      </div>
    </div>
  );
}

export default Reports;