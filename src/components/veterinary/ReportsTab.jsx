import React, { useState, useContext } from "react";
import { VeterinaryContext } from "../../context/VeterinaryContext";
import "../../styles/VetReportsTab.css"; // ✅ stylesheet name

function ReportsTab() {
  const { appointments } = useContext(VeterinaryContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Filter appointments by date range
  const filteredAppointments = appointments.filter(a => {
    if (!startDate || !endDate) return true;
    return a.date >= startDate && a.date <= endDate;
  });

  // ✅ Calculate totals
  const totalAppointments = filteredAppointments.length;
  const totalRevenue = filteredAppointments.reduce((sum, a) => sum + (a.fee || 0), 0);

  return (
    <section className="dashboard-section" id="reports-section">
      <h3>Reports</h3>

      {/* Date Range Filters */}
      <div className="report-controls card">
        <div className="form-row">
          <label>
            From: 
            <input 
              type="date" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
            />
          </label>
          <label>
            To: 
            <input 
              type="date" 
              value={endDate} 
              onChange={e => setEndDate(e.target.value)} 
            />
          </label>
        </div>

        {/* Quick Filters */}
        <div className="quick-filters">
          <button onClick={() => { setStartDate(""); setEndDate(""); }}>All</button>
          <button onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            setStartDate(today);
            setEndDate(today);
          }}>Today</button>
          <button onClick={() => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            setStartDate(weekAgo.toISOString().split("T")[0]);
            setEndDate(new Date().toISOString().split("T")[0]);
          }}>Last 7 Days</button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Date</th><th>Time</th><th>Customer</th><th>Pet</th>
              <th>Type</th><th>Reason</th><th>Status</th><th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr><td colSpan="8">No appointments found.</td></tr>
            ) : (
              filteredAppointments.map(a => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.customer}</td>
                  <td>{a.pet}</td>
                  <td>{a.type}</td>
                  <td>{a.reason}</td>
                  <td>{a.status}</td>
                  <td>{a.fee}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Ledger Summary */}
      <div className="ledger-section card">
        <h3>Summary</h3>
        <p>Total Appointments: {totalAppointments}</p>
        <p>Total Revenue: ₱{totalRevenue}</p>
      </div>
    </section>
  );
}

export default ReportsTab;