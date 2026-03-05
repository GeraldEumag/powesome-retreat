import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/DeductionsTab.css";
import "./styles/PayrollDashboard.css";
function DeductionsTab() {
  const { employees, deductions, updateDeductions } = useContext(PayrollContext);

  const [form, setForm] = useState({
    employeeId: "",
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    tax: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employeeId) return;

    updateDeductions(form);
    setForm({ employeeId: "", sss: 0, philhealth: 0, pagibig: 0, tax: 0 });
  };

  return (
    <section className="deductions-tab">
      <h2>Manage Employee Deductions</h2>

      {/* Deductions Form */}
      <form className="deductions-form" onSubmit={handleSubmit}>
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
          type="number"
          placeholder="SSS"
          value={form.sss}
          onChange={(e) => setForm({ ...form, sss: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="PhilHealth"
          value={form.philhealth}
          onChange={(e) => setForm({ ...form, philhealth: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Pag-IBIG"
          value={form.pagibig}
          onChange={(e) => setForm({ ...form, pagibig: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Tax"
          value={form.tax}
          onChange={(e) => setForm({ ...form, tax: Number(e.target.value) })}
        />

        <button type="submit">Update Deductions</button>
      </form>

      {/* Deductions Table */}
      <h3>Current Deductions</h3>
      <table className="deductions-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>SSS</th>
            <th>PhilHealth</th>
            <th>Pag-IBIG</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => {
            const empDeduction = deductions[emp.id] || { sss: 0, philhealth: 0, pagibig: 0, tax: 0 };
            return (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>₱{empDeduction.sss.toLocaleString()}</td>
                <td>₱{empDeduction.philhealth.toLocaleString()}</td>
                <td>₱{empDeduction.pagibig.toLocaleString()}</td>
                <td>₱{empDeduction.tax.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default DeductionsTab;