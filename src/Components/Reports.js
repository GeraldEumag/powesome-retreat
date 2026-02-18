import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Reports.css';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

function Reports() {
  const [dateRange, setDateRange] = useState('Last 7 Days');

  // KPI data
  const kpis = {
    revenue: { value: 782000, change: 18 },
    bookings: { value: 391, change: 24 },
    customers: { value: 127, change: 15 },
    avgRevenue: { value: 18200, change: 12 }
  };

  // Bar chart data (Jan–Jun)
  const revenueByService = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Hotel', data: [52000, 54000, 60000, 58000, 55000, 61000], backgroundColor: '#27ae60' },
      { label: 'Veterinary', data: [38000, 40000, 42000, 41000, 39000, 42000], backgroundColor: '#e67e22' },
      { label: 'Products', data: [22000, 23000, 25000, 24000, 23500, 26000], backgroundColor: '#2ecc71' },
      { label: 'Grooming', data: [15000, 16000, 17000, 16500, 15500, 18000], backgroundColor: '#f1c40f' }
    ]
  };

  // Donut chart data
  const revenueDistribution = {
    labels: ['Hotel Services', 'Veterinary', 'Products', 'Grooming'],
    datasets: [
      {
        data: [320000, 231000, 136000, 95000],
        backgroundColor: ['#27ae60', '#e67e22', '#2ecc71', '#f1c40f']
      }
    ]
  };

  // Line chart data (Customer Growth)
  const customerGrowth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Registered Pets',
        data: [120, 180, 250, 320, 400, 480],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  // Top Services data
  const topServices = [
    { name: 'Hotel Boarding', revenue: 125000, bookings: 89 },
    { name: 'Veterinary Consultation', revenue: 78000, bookings: 156 },
    { name: 'Grooming', revenue: 54000, bookings: 67 },
    { name: 'Vaccination', revenue: 22500, bookings: 45 },
    { name: 'Dental Cleaning', revenue: 30600, bookings: 34 }
  ];

  return (
    <div className="reports-container">
      <Sidebar />
      <div className="reports-content">
        <h1>Reports & Analytics</h1>
        <p>Business insights and performance metrics</p>

        {/* Filters */}
        <div className="filters">
          <label>Report Period:</label>
          <input type="date" defaultValue="2026-01-01" />
          <input type="date" defaultValue="2026-02-12" />
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="export-btn">Export Report</button>
        </div>

        {/* KPI Cards */}
        <div className="metrics">
          <div className="metric-card"><h3>Total Revenue</h3><p>₱{kpis.revenue.value.toLocaleString()}</p><span className="change">+{kpis.revenue.change}% vs last period</span></div>
          <div className="metric-card"><h3>Total Bookings</h3><p>{kpis.bookings.value}</p><span className="change">+{kpis.bookings.change}% vs last period</span></div>
          <div className="metric-card"><h3>New Customers</h3><p>{kpis.customers.value}</p><span className="change">+{kpis.customers.change}% vs last period</span></div>
          <div className="metric-card"><h3>Avg Revenue/Day</h3><p>₱{kpis.avgRevenue.value.toLocaleString()}</p><span className="change">+{kpis.avgRevenue.change}% vs last period</span></div>
        </div>

        {/* Charts row */}
        <div className="charts">
          <div className="chart">
            <h2>Revenue by Service</h2>
            <Bar data={revenueByService} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
          </div>
          <div className="chart">
            <h2>Revenue Distribution</h2>
            <Doughnut 
              data={revenueDistribution} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    color: '#fff',
                    formatter: (value, ctx) => {
                      const dataset = ctx.chart.data.datasets[0].data;
                      const total = dataset.reduce((a, b) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `₱${value.toLocaleString()} (${percentage}%)`;
                    },
                    font: { weight: 'bold', size: 12 }
                  },
                  legend: { position: 'bottom' }
                }
              }} 
              height={250} 
            />
          </div>
        </div>

        {/* Customer Growth + Top Services row */}
        <div className="charts">
          <div className="chart">
            <h2>Customer Growth</h2>
            <p className="subtitle">Total registered pets over time</p>
            <Line 
              data={customerGrowth} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, max: 300, ticks: { stepSize: 50 } }
                }
              }} 
              height={200} 
            />
          </div>
          <div className="chart">
            <h2>Top Services</h2>
            <ul className="top-services">
              {topServices.map((s, i) => (
                <li key={i}>
                  <strong>{i+1}. {s.name}</strong> — ₱{s.revenue.toLocaleString()} ({s.bookings} bookings)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;