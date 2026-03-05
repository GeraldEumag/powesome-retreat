import React, { useState, useContext } from "react";
import { PayrollContext } from "./PayrollContext";

function AttendanceTab() {
  const {
    employees,
    logAttendance,
    editAttendance,
    deleteAttendance,
    submitLeaveRequest,
    leaveRequests,
    approveLeave,
    rejectLeave,
    attendance,
  } = useContext(PayrollContext);

  const [attendanceForm, setAttendanceForm] = useState({
    employeeId: "",
    date: "",
    timeIn: "",
    timeOut: "",
    status: "Present",
  });

  const [leaveForm, setLeaveForm] = useState({
    employeeId: "",
    date: "",
    reason: "",
  });

  // ✅ Attendance Submit
  const handleAttendanceSubmit = () => {
    if (!attendanceForm.employeeId || !attendanceForm.date || !attendanceForm.timeIn || !attendanceForm.timeOut) return;

    const start = new Date(`${attendanceForm.date}T${attendanceForm.timeIn}`);
    const end = new Date(`${attendanceForm.date}T${attendanceForm.timeOut}`);
    const diffHours = (end - start) / (1000 * 60 * 60);

    const normalHours = Math.min(diffHours, 8);
    const overtimeHours = diffHours > 8 ? diffHours - 8 : 0;

    const record = {
      ...attendanceForm,
      hours: normalHours,
      overtime: overtimeHours,
    };

    logAttendance(record);

    setAttendanceForm({
      employeeId: "",
      date: "",
      timeIn: "",
      timeOut: "",
      status: "Present",
    });
  };

  // ✅ Leave Submit
  const handleLeaveSubmit = () => {
    if (!leaveForm.employeeId || !leaveForm.date || !leaveForm.reason) return;
    submitLeaveRequest(leaveForm);
    setLeaveForm({ employeeId: "", date: "", reason: "" });
  };

  return (
    <section className="attendance-tab">
      <h2>Attendance & Leave Management</h2>

      {/* Attendance Form */}
      <h3>Log Attendance</h3>
      <div className="attendance-form">
        <label>Employee:</label>
        <select
          value={attendanceForm.employeeId}
          onChange={(e) => setAttendanceForm({ ...attendanceForm, employeeId: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={attendanceForm.date}
          onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
        />

        <label>Time In:</label>
        <input
          type="time"
          value={attendanceForm.timeIn}
          onChange={(e) => setAttendanceForm({ ...attendanceForm, timeIn: e.target.value })}
        />

        <label>Time Out:</label>
        <input
          type="time"
          value={attendanceForm.timeOut}
          onChange={(e) => setAttendanceForm({ ...attendanceForm, timeOut: e.target.value })}
        />

        <label>Status:</label>
        <select
          value={attendanceForm.status}
          onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>

        <button onClick={handleAttendanceSubmit}>Log Attendance</button>
      </div>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((rec) => (
              <tr key={rec.id}>
                <td>{employees.find((e) => e.id === rec.employeeId)?.name || "Unknown"}</td>
                <td>{rec.date}</td>
                <td>{rec.timeIn}</td>
                <td>{rec.timeOut}</td>
                <td>{rec.hours}</td>
                <td>{rec.overtime}</td>
                <td>{rec.status}</td>
                <td>
                  <button onClick={() => editAttendance(rec.id, { status: rec.status === "Present" ? "Late" : "Present" })}>
                    Edit
                  </button>
                  <button onClick={() => deleteAttendance(rec.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8">No attendance records yet</td></tr>
          )}
        </tbody>
      </table>

      {/* Leave Form */}
      <h3>Leave Requests</h3>
      <div className="leave-form">
        <label>Employee:</label>
        <select
          value={leaveForm.employeeId}
          onChange={(e) => setLeaveForm({ ...leaveForm, employeeId: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={leaveForm.date}
          onChange={(e) => setLeaveForm({ ...leaveForm, date: e.target.value })}
        />

        <label>Reason:</label>
        <input
          type="text"
          placeholder="e.g. Sick Leave"
          value={leaveForm.reason}
          onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
        />

        <button onClick={handleLeaveSubmit}>Submit Leave Request</button>
      </div>

      {/* Leave Requests Table */}
      <h3>Pending Leave Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((req) => (
              <tr key={req.id}>
                <td>{employees.find((e) => e.id === req.employeeId)?.name || "Unknown"}</td>
                <td>{req.date}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => approveLeave(req.id, true)}>Approve Paid</button>
                      <button onClick={() => approveLeave(req.id, false)}>Approve Unpaid</button>
                      <button onClick={() => rejectLeave(req.id)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No pending requests</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default AttendanceTab;