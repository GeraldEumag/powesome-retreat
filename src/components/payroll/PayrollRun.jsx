import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/PayrollRun.css";
import "./styles/PayrollDashboard.css";

function PayrollRun() {
  const { runPayroll, payrollRuns } = useContext(PayrollContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [cycle, setCycle] = useState("monthly"); // payroll cycle type
  const [previewPeriod, setPreviewPeriod] = useState("");

  const formatPeriod = (dateStr, cycleType) => {
    const dateObj = new Date(dateStr);
    const month = dateObj.toLocaleString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();

    if (cycleType === "monthly") {
      return `${month}-${year}`;
    }
    if (cycleType === "biweekly") {
      const half = day <= 15 ? "1-15" : "16-end";
      return `${month} ${half}, ${year}`;
    }
    if (cycleType === "weekly") {
      const week = Math.ceil(day / 7);
      return `${month} Week ${week}, ${year}`;
    }
    return `${month}-${year}`;
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    if (dateValue) {
      setPreviewPeriod(formatPeriod(dateValue, cycle));
    } else {
      setPreviewPeriod("");
    }
  };

  const handleCycleChange = (e) => {
    const cycleValue = e.target.value;
    setCycle(cycleValue);
    if (selectedDate) {
      setPreviewPeriod(formatPeriod(selectedDate, cycleValue));
    }
  };

  const handleRun = () => {
    if (!selectedDate) return;
    const periodLabel = formatPeriod(selectedDate, cycle);
    runPayroll(periodLabel);
    setSelectedDate("");
    setPreviewPeriod("");
  };

  return (
    <section className="payroll-run">
      <h2>Payroll Processing</h2>

      {/* Payroll Run Form */}
      <div className="payroll-run-form">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <select value={cycle} onChange={handleCycleChange}>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="weekly">Weekly</option>
        </select>
        <button onClick={handleRun}>Run Payroll</button>
      </div>

      {/* ✅ Preview Label */}
      {previewPeriod && (
        <p className="preview-label">
          Payroll Period Preview: <strong>{previewPeriod}</strong>
        </p>
      )}

      {/* Payroll Runs Table */}
      {payrollRuns.length > 0 ? (
        payrollRuns.map((run) => (
          <div key={run.id} className="payroll-run-summary">
            <h3>Period: {run.period}</h3>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Hours Worked</th>
                  <th>Overtime</th>
                  <th>Gross Pay</th>
                  <th>Deductions</th>
                  <th>Benefits</th>
                  <th>Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {run.results.map((res) => (
                  <tr key={res.employeeId}>
                    <td>{res.name}</td>
                    <td>{res.hoursWorked}</td>
                    <td>{res.overtime}</td>
                    <td>₱{res.grossPay.toLocaleString()}</td>
                    <td>₱{res.deductions.toLocaleString()}</td>
                    <td>₱{res.benefits.toLocaleString()}</td>
                    <td><strong>₱{res.netPay.toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No payroll runs yet. Run payroll to see results.</p>
      )}
    </section>
  );
}

export default PayrollRun;