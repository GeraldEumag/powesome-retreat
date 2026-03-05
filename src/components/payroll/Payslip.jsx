import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/Payslip.css";
import "./styles/PayrollDashboard.css";
function Payslip() {
  const { employees, generatePayslip } = useContext(PayrollContext);

  const [employeeId, setEmployeeId] = useState("");
  const [period, setPeriod] = useState("");
  const [payslip, setPayslip] = useState(null);

  const handleGenerate = () => {
    if (!employeeId || !period) return;
    const slip = generatePayslip(employeeId, period);
    setPayslip(slip);
  };

  return (
    <section className="payslip-section">
      <h2>Payslip Generator</h2>

      {/* Payslip Form */}
      <div className="payslip-form">
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Payroll Period (e.g. Mar 1-15)"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />

        <button onClick={handleGenerate}>Generate Payslip</button>
      </div>

      {/* Payslip Display */}
      {payslip ? (
        <div className="payslip-card">
          <h3>Payslip for {payslip.name}</h3>
          <p><strong>Period:</strong> {payslip.period}</p>
          <p><strong>Gross Pay:</strong> ₱{payslip.grossPay.toLocaleString()}</p>
          <p><strong>Deductions:</strong> ₱{payslip.deductions.toLocaleString()}</p>
          <p><strong>Benefits:</strong> ₱{payslip.benefits.toLocaleString()}</p>
          <p><strong>Net Pay:</strong> <span className="net-pay">₱{payslip.netPay.toLocaleString()}</span></p>
        </div>
      ) : (
        <p>No payslip generated yet. Select employee and period.</p>
      )}
    </section>
  );
}

export default Payslip;