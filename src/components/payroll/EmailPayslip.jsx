import React, { useState, useContext } from "react";
import { PayrollContext } from "./PayrollContext";

function EmailPayslipForm() {
  const { employees, generatePayslip } = useContext(PayrollContext);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [cycle, setCycle] = useState("monthly");
  const [previewPeriod, setPreviewPeriod] = useState("");

  const formatPeriod = (dateStr, cycleType) => {
    const dateObj = new Date(dateStr);
    const month = dateObj.toLocaleString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();

    if (cycleType === "monthly") return `${month}-${year}`;
    if (cycleType === "biweekly") return `${month} ${day <= 15 ? "1-15" : "16-end"}, ${year}`;
    if (cycleType === "weekly") return `${month} Week ${Math.ceil(day / 7)}, ${year}`;
    return `${month}-${year}`;
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (val) setPreviewPeriod(formatPeriod(val, cycle));
  };

  const handleCycleChange = (e) => {
    const val = e.target.value;
    setCycle(val);
    if (selectedDate) setPreviewPeriod(formatPeriod(selectedDate, val));
  };

  const handleSend = () => {
    if (!selectedEmployee || !selectedDate) return;
    const periodLabel = formatPeriod(selectedDate, cycle);
    const payslip = generatePayslip(parseInt(selectedEmployee), periodLabel);
    if (payslip) {
      alert(`Payslip for ${payslip.name} (${periodLabel}) sent via email!`);
    }
    setSelectedDate("");
    setPreviewPeriod("");
  };

  return (
    <section className="email-payslip">
      <h2>Email Payslip</h2>
      <div className="payslip-form">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <select value={cycle} onChange={handleCycleChange}>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="weekly">Weekly</option>
        </select>
        <button onClick={handleSend}>Send Payslip</button>
      </div>
      {previewPeriod && (
        <p className="preview-label">
          Payroll Period Preview: <strong>{previewPeriod}</strong>
        </p>
      )}
    </section>
  );
}

export default EmailPayslipForm;