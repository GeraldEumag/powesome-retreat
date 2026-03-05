import React, { useState, useContext } from "react";
import { PayrollContext } from "./PayrollContext";

function PayrollSummary() {
  const { summary, generateReport } = useContext(PayrollContext); 
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

  const handleGenerate = () => {
    if (!selectedDate) return;
    const periodLabel = formatPeriod(selectedDate, cycle);
    generateReport(periodLabel); // ✅ updates summary in context
    setSelectedDate("");
    setPreviewPeriod("");
  };

  return (
    <section className="payroll-summary">
      <h2>Payroll Summary</h2>
      <div className="summary-form">
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <select value={cycle} onChange={handleCycleChange}>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="weekly">Weekly</option>
        </select>
        <button onClick={handleGenerate}>Generate Summary</button>
      </div>

      {previewPeriod && (
        <p className="preview-label">
          Payroll Period Preview: <strong>{previewPeriod}</strong>
        </p>
      )}

      {/* ✅ Render Summary if available */}
      {summary ? (
        <div className="summary-output">
          <h3>Summary for {summary.period}</h3>

          {/* Totals Table */}
          <table className="summary-table">
            <thead>
              <tr>
                <th>Total Gross Pay</th>
                <th>Total Deductions</th>
                <th>Total Benefits</th>
                <th>Total Net Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₱{summary.gross.toLocaleString()}</td>
                <td>₱{summary.deductions.toLocaleString()}</td>
                <td>₱{summary.benefits.toLocaleString()}</td>
                <td><strong>₱{summary.net.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Employee Breakdown */}
          <h4>Employee Breakdown</h4>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Gross Pay</th>
                <th>Deductions</th>
                <th>Benefits</th>
                <th>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {summary.employees.map((res) => (
                <tr key={res.employeeId}>
                  <td>{res.name}</td>
                  <td>₱{res.grossPay.toLocaleString()}</td>
                  <td>₱{res.deductions.toLocaleString()}</td>
                  <td>₱{res.benefits.toLocaleString()}</td>
                  <td><strong>₱{res.netPay.toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No summary available. Enter a valid payroll period.</p>
      )}
    </section>
  );
}

export default PayrollSummary;