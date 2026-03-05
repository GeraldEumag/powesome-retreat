import React, { useContext } from "react";
import { PayrollContext } from "../payroll/PayrollContext";


function AttendanceTab() {
  const { employees, attendance } = useContext(PayrollContext);

  return (
    <section className="dashboard-section">
      <h3>Attendance</h3>
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
          {attendance.length > 0 ? (
            attendance.map((rec, idx) => (
              <tr key={idx}>
                <td>
                  {employees.find((e) => e.id === rec.employeeId)?.name || "Unknown"}
                </td>
                <td>{rec.date}</td>
                <td>{rec.timeIn}</td>
                <td>{rec.timeOut}</td>
                <td>{rec.hours}</td>
                <td>{rec.overtime}</td>
                <td>{rec.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No attendance records yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default AttendanceTab;