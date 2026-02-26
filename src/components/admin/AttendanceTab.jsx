import React from "react";

function AttendanceTab() {
  return (
    <section className="dashboard-section">
      <h3>Attendance</h3>
      <table>
        <thead>
            <tr><th>Employee</th><th>Date</th><th>Time In</th><th>Time Out</th><th>Status</th></tr>
        </thead>
        <tbody>
            <tr><td>Pedro Reyes</td><td>Feb 20, 2026</td><td>8:00 AM</td><td>5:00 PM</td><td>Present</td></tr>
            <tr><td>Ana Cruz</td><td>Feb 20, 2026</td><td>8:30 AM</td><td>5:30 PM</td><td>Present</td></tr>
            <tr><td>Juan Dela Cruz</td><td>Feb 20, 2026</td><td>9:00 AM</td><td>6:00 PM</td><td>Late</td></tr>
        </tbody>
      </table>
    </section>
  );
}

export default AttendanceTab;