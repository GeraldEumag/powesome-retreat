import React from "react";

function PayrollTab() {
  return (
    <section className="dashboard-section">
      <h3>Payroll</h3>
      <table>
        <thead>
          <tr><th>Employee</th><th>Role</th><th>Salary</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Pedro Reyes</td><td>Receptionist</td><td>₱20,000</td><td>Paid</td></tr>
          <tr><td>Ana Cruz</td><td>Cashier</td><td>₱18,000</td><td>Pending</td></tr>
        </tbody>
      </table>
    </section>
  );
}

export default PayrollTab;