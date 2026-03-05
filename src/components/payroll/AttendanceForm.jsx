import React, { useState } from "react";

function AttendanceForm() {
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    timeIn: "",
    timeOut: "",
    status: "Present",
  });

  const [records, setRecords] = useState([]);

  const handleSubmit = () => {
    if (!form.employeeId || !form.date || !form.timeIn || !form.timeOut) return;

    // Compute hours worked
    const start = new Date(`${form.date}T${form.timeIn}`);
    const end = new Date(`${form.date}T${form.timeOut}`);
    const diffHours = (end - start) / (1000 * 60 * 60);

    // Assume 8 hours normal shift
    const normalHours = Math.min(diffHours, 8);
    const overtimeHours = diffHours > 8 ? diffHours - 8 : 0;

    const record = {
      ...form,
      hoursWorked: normalHours,
      overtime: overtimeHours,
    };

    // Save record locally
    setRecords([...records, record]);

    // Reset form
    setForm({
      employeeId: "",
      date: "",
      timeIn: "",
      timeOut: "",
      status: "Present",
    });
  };

  return (
    <div className="attendance-form">
      <h2>Log Attendance</h2>

      <label>Employee:</label>
      <select
        value={form.employeeId}
        onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
      >
        <option value="">Select Employee</option>
        <option value="1">John Doe</option>
        <option value="2">Jane Smith</option>
      </select>

      <label>Date Today:</label>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <label>Time In:</label>
      <input
        type="time"
        value={form.timeIn}
        onChange={(e) => setForm({ ...form, timeIn: e.target.value })}
      />

      <label>Time Out:</label>
      <input
        type="time"
        value={form.timeOut}
        onChange={(e) => setForm({ ...form, timeOut: e.target.value })}
      />

      <label>Status:</label>
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>

      <button onClick={handleSubmit}>Log Attendance</button>

      {/* Attendance Records Table */}
      <h3>Attendance Records</h3>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Hours Worked</th>
            <th>Overtime</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((rec, idx) => (
              <tr key={idx}>
                <td>{rec.employeeId}</td>
                <td>{rec.date}</td>
                <td>{rec.timeIn}</td>
                <td>{rec.timeOut}</td>
                <td>{rec.hoursWorked}</td>
                <td>{rec.overtime}</td>
                <td>{rec.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No records yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceForm;