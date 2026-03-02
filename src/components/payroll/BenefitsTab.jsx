import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/BenefitsTab.css";

function BenefitsTab() {
  const { employees, updateBenefits } = useContext(PayrollContext);
  const [benefit, setBenefit] = useState({
    employeeId: "",
    allowance: 0,
    bonus: 0,
    incentive: 0,
  });

  const handleSave = () => {
    if (!benefit.employeeId) return;
    updateBenefits(benefit);
    setBenefit({ employeeId: "", allowance: 0, bonus: 0, incentive: 0 });
  };

  return (
    <section className="benefits-tab">
      <h2>Benefits Management</h2>
      <select
        value={benefit.employeeId}
        onChange={(e) => setBenefit({ ...benefit, employeeId: e.target.value })}
      >
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Allowance"
        value={benefit.allowance}
        onChange={(e) => setBenefit({ ...benefit, allowance: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Bonus"
        value={benefit.bonus}
        onChange={(e) => setBenefit({ ...benefit, bonus: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Incentive"
        value={benefit.incentive}
        onChange={(e) => setBenefit({ ...benefit, incentive: Number(e.target.value) })}
      />
      <button onClick={handleSave}>Save Benefits</button>
    </section>
  );
}

export default BenefitsTab;