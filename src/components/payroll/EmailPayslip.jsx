import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/EmailPayslip.css";

function EmailPayslip() {
  const { employees, generatePayslip } = useContext(PayrollContext);
  const [employeeId, setEmployeeId] = useState("");
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    if (!employeeId || !period) return;
    const payslip = generatePayslip(employeeId, period);
    if (!payslip) {
      setStatus("No payslip found for this period.");
      return;
    }

    try {
      // Example: call backend API to send email
      const response = await fetch("/api/sendPayslip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, period, payslip }),
      });

      if (response.ok) {
        setStatus("Payslip sent successfully!");
      } else {
        setStatus("Failed to send payslip.");
      }
    } catch (error) {
      setStatus("Error sending payslip.");
    }
  };

  return (
    <section className="email-payslip">
      <h2>Email Payslip</h2>
      <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Payroll Period (e.g. Feb 2026)"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      />
      <button onClick={handleSend}>Send Payslip</button>
      {status && <p className="status">{status}</p>}
    </section>
  );
}

export default EmailPayslip;