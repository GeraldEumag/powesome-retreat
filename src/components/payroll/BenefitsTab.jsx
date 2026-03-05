import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/BenefitsTab.css";
import "./styles/PayrollDashboard.css";
function BenefitsTab() {
  const { employees, benefits, updateBenefits } = useContext(PayrollContext);

  const [form, setForm] = useState({
    employeeId: "",
    allowance: 0,
    bonus: 0,
    incentive: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employeeId) return;

    updateBenefits(form);
    setForm({ employeeId: "", allowance: 0, bonus: 0, incentive: 0 });
  };

  return (
    <section className="benefits-tab">
      <h2>Manage Employee Benefits</h2>

      {/* Benefits Form */}
      <form className="benefits-form" onSubmit={handleSubmit}>
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
          placeholder="Allowance"
          value={form.allowance}
          onChange={(e) => setForm({ ...form, allowance: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Bonus"
          value={form.bonus}
          onChange={(e) => setForm({ ...form, bonus: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Incentive"
          value={form.incentive}
          onChange={(e) => setForm({ ...form, incentive: Number(e.target.value) })}
        />

        <button type="submit">Update Benefits</button>
      </form>

      {/* Benefits Table */}
      <h3>Current Benefits</h3>
      <table className="benefits-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Allowance</th>
            <th>Bonus</th>
            <th>Incentive</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => {
            const empBenefit = benefits[emp.id] || { allowance: 0, bonus: 0, incentive: 0 };
            return (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>₱{empBenefit.allowance.toLocaleString()}</td>
                <td>₱{empBenefit.bonus.toLocaleString()}</td>
                <td>₱{empBenefit.incentive.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default BenefitsTab;