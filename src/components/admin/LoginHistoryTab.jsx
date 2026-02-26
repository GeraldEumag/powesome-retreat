import React, { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import "../../styles/LoginHistoryTab.css";

function LoginHistoryTab() {
  const context = useContext(LoginContext);

  // ✅ Always call hooks at the top level
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // ✅ Defensive check AFTER hooks
  if (!context) {
    return (
      <section className="dashboard-section">
        <h3>Login History</h3>
        <p style={{ color: "red" }}>
          ⚠️ LoginContext not available. Make sure <strong>LoginProvider</strong> wraps your app.
        </p>
      </section>
    );
  }

  const { loginHistory } = context;

  // ✅ Apply filters
  const filteredHistory = loginHistory.filter((event) => {
    const matchesRole = roleFilter === "All" || event.role === roleFilter;
    const matchesStatus = statusFilter === "All" || event.status === statusFilter;
    const matchesDate = !dateFilter || event.time.includes(dateFilter);

    return matchesRole && matchesStatus && matchesDate;
  });

  return (
    <section className="dashboard-section">
      <h3>Login History</h3>
      <p>Track user login attempts and activity</p>

      {/* Filters */}
      <div className="login-filters">
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Administrator">Administrator</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Cashier">Cashier</option>
          <option value="Veterinary">Veterinary</option>
          <option value="Customer">Customer</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
          <option value="Logout">Logout</option>
        </select>

        <input
          type="text"
          placeholder="Filter by date (e.g. 2026-02-25)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="login-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.user}</td>
              <td>{event.role}</td>
              <td className={event.status.toLowerCase()}>{event.status}</td>
              <td>{event.time}</td>
            </tr>
          ))}
          {filteredHistory.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No login events match your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default LoginHistoryTab;