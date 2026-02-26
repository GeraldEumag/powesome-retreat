import React, { useContext } from "react";
import { POSContext } from "../../context/POSContext";
import "../../styles/ReportsTab.css";

function ReportsTab() {
  const context = useContext(POSContext);

  if (!context) {
    return <p style={{ color: "red" }}>⚠️ POSContext not available. Make sure POSProvider wraps your app.</p>;
  }

  const { transactions } = context;

  // ✅ Calculate metrics
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBookings = transactions.length;
  const newCustomers = new Set(transactions.map(t => t.customer)).size;
  const avgRevenuePerDay = (totalRevenue / new Set(transactions.map(t => t.date)).size).toFixed(2);

  const serviceCount = {};
  transactions.forEach(t => {
    serviceCount[t.service] = (serviceCount[t.service] || 0) + 1;
  });
  const topService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0][0];

  const reports = [
    { metric: "Total Revenue", value: `₱${totalRevenue.toLocaleString()}` },
    { metric: "Total Bookings", value: totalBookings },
    { metric: "New Customers", value: newCustomers },
    { metric: "Avg Revenue/Day", value: `₱${avgRevenuePerDay}` },
    { metric: "Top Service", value: topService },
  ];

  return (
    <section className="dashboard-section">
      <h3>General Reports</h3>
      <p>Overview of system performance and KPIs</p>

      {/* KPI Cards */}
      <div className="reports-cards">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <h4>{report.metric}</h4>
            <p>{report.value}</p>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr><th>Metric</th><th>Value</th></tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.metric}</td>
              <td>{report.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ POS Transactions Ledger */}
      <h3 style={{ marginTop: "30px" }}>POS Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.customer}</td>
              <td>{t.service}</td>
              <td>₱{t.amount.toLocaleString()}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ReportsTab;