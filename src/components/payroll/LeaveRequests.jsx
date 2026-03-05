import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/LeaveRequests.css";
import "./styles/PayrollDashboard.css";
function LeaveRequests() {
  const { employees, attendance, logAttendance, approveLeave } = useContext(PayrollContext);

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    period: "",
    reason: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.date || !form.period) return;

    logAttendance({
      id: Date.now(),
      employeeId: parseInt(form.employeeId),
      date: form.date,
      hours: 0,
      overtime: 0,
      status: "Leave",
      period: form.period,
      reason: form.reason
    });

    setForm({ employeeId: "", date: "", period: "", reason: "" });
  };

  return (
    <section className="leave-requests">
      <h2>Leave Requests</h2>

      {/* Leave Request Form */}
      <form className="leave-form" onSubmit={handleSubmit}>
        <select
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Payroll Period (e.g. Mar 1-15)"
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
        />

        <input
          type="text"
          placeholder="Reason for Leave"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button type="submit">Submit Leave Request</button>
      </form>

      {/* Leave Requests Table */}
      <h3>Pending Leave Requests</h3>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Period</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendance.filter(a => a.status === "Leave").map(req => {
            const emp = employees.find(e => e.id === req.employeeId);
            return (
              <tr key={req.id}>
                <td>{emp ? emp.name : "Unknown"}</td>
                <td>{req.date}</td>
                <td>{req.period}</td>
                <td>{req.reason || "—"}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Leave" && (
                    <button onClick={() => approveLeave(req.id)}>Approve</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default LeaveRequests;