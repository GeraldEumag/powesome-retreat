import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/DeductionsTab.css";

function DeductionsTab() {
  const { employees, updateDeductions } = useContext(PayrollContext);
  const [deduction, setDeduction] = useState({
    employeeId: "",
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    tax: 0,
  });

  const handleSave = () => {
    if (!deduction.employeeId) return;
    updateDeductions(deduction);
    setDeduction({ employeeId: "", sss: 0, philhealth: 0, pagibig: 0, tax: 0 });
  };

  return (
    <section className="deductions-tab">
      <h2>Deductions Management</h2>
      <select
        value={deduction.employeeId}
        onChange={(e) => setDeduction({ ...deduction, employeeId: e.target.value })}
      >
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <input type="number" placeholder="SSS" value={deduction.sss}
        onChange={(e) => setDeduction({ ...deduction, sss: Number(e.target.value) })} />
      <input type="number" placeholder="PhilHealth" value={deduction.philhealth}
        onChange={(e) => setDeduction({ ...deduction, philhealth: Number(e.target.value) })} />
      <input type="number" placeholder="Pag-IBIG" value={deduction.pagibig}
        onChange={(e) => setDeduction({ ...deduction, pagibig: Number(e.target.value) })} />
      <input type="number" placeholder="Tax" value={deduction.tax}
        onChange={(e) => setDeduction({ ...deduction, tax: Number(e.target.value) })} />
      <button onClick={handleSave}>Save Deductions</button>
    </section>
  );
}

export default DeductionsTab;