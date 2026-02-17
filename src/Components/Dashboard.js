// src/Components/Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  // KPI metrics
  const metrics = {
    totalPets: 247,
    hotelBookings: 89,
    consultations: 156,
    revenue: 284500
  };

  // Line chart data (Revenue Overview)
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [20000, 35000, 50000, 60000, 75000, 80000],
        fill: false,
        borderColor: '#3498db',
        tension: 0.1
      }
    ]
  };

  // Doughnut chart data (Service Distribution)
  const serviceData = {
    labels: ['Hotel Services', 'Veterinary', 'Grooming', 'Products'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ['#1abc9c', '#f39c12', '#2ecc71', '#e74c3c']
      }
    ]
  };

  // Recent Activities
  const recentActivities = [
    "New hotel reservation for Max (Golden Retriever) — 5 mins ago",
    "Consultation completed for Luna (Persian Cat) — 15 mins ago",
    "Charlie checked out - 3 days stay — 1 hour ago",
    "POS Sale: Premium Dog Food x2 — 2 hours ago"
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Overview of business performance</p>

        {/* KPI Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Pets</h3>
            <p>{metrics.totalPets}</p>
            <small>↑ +12% from last month</small>
          </div>
          <div className="metric-card">
            <h3>Hotel Bookings</h3>
            <p>{metrics.hotelBookings}</p>
            <small>↑ +8% from last month</small>
          </div>
          <div className="metric-card">
            <h3>Consultations</h3>
            <p>{metrics.consultations}</p>
            <small>↑ +24% from last month</small>
          </div>
          <div className="metric-card">
            <h3>Revenue</h3>
            <p>₱{metrics.revenue.toLocaleString()}</p>
            <small>↑ +18% from last month</small>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="chart-box">
            <h3>Revenue Overview</h3>
            <p>Monthly revenue and bookings</p>
            <div className="chart-wrapper">
              <Line
                id="revenueChart"
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }}
              />
            </div>
          </div>
          <div className="chart-box">
            <h3>Service Distribution</h3>
            <p>Revenue by category</p>
            <div className="chart-wrapper">
              <Doughnut
                id="serviceChart"
                data={serviceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          let label = context.label || '';
                          let value = context.raw;
                          return `${label}: ${value}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <h3>Recent Activities</h3>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button>New Booking</button>
            <button>Add Pet</button>
            <button>New Consultation</button>
            <button>POS Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;