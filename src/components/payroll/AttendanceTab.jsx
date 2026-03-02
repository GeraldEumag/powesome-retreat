import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/AttendanceTab.css";

function AttendanceTab() {
  const { employees, attendance, logAttendance, approveLeave } = useContext(PayrollContext);

  const [record, setRecord] = useState({
    employeeId: "",
    date: "",
    hours: 0,
    overtime: 0,
    status: "Present",
    period: ""
  });

  const handleLog = () => {
    if (!record.employeeId || !record.date) return;
    logAttendance(record);
    setRecord({ employeeId: "", date: "", hours: 0, overtime: 0, status: "Present", period: "" });
  };

  return (
    <section className="attendance-tab">
      <h2>Attendance Tracking</h2>

      {/* Attendance Form */}
      <div className="attendance-form">
        <select
          value={record.employeeId}
          onChange={(e) => setRecord({ ...record, employeeId: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={record.date}
          onChange={(e) => setRecord({ ...record, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hours Worked"
          value={record.hours}
          onChange={(e) => setRecord({ ...record, hours: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Overtime Hours"
          value={record.overtime}
          onChange={(e) => setRecord({ ...record, overtime: Number(e.target.value) })}
        />
        <select
          value={record.status}
          onChange={(e) => setRecord({ ...record, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
        <input
          type="text"
          placeholder="Payroll Period (e.g. Mar 1-15)"
          value={record.period}
          onChange={(e) => setRecord({ ...record, period: e.target.value })}
        />
        <button onClick={handleLog}>Log Attendance</button>
      </div>

      {/* Attendance Table */}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Overtime</th>
            <th>Status</th>
            <th>Period</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(rec => {
            const emp = employees.find(e => e.id === rec.employeeId);
            return (
              <tr key={rec.id}>
                <td>{emp ? emp.name : "Unknown"}</td>
                <td>{rec.date}</td>
                <td>{rec.hours}</td>
                <td>{rec.overtime}</td>
                <td>{rec.status}</td>
                <td>{rec.period}</td>
                <td>
                  {rec.status === "Leave" && rec.status !== "Approved" && (
                    <button onClick={() => approveLeave(rec.id)}>Approve Leave</button>
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

export default AttendanceTab;