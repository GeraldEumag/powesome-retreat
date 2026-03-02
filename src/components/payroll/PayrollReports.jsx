import React, { useContext } from "react";
import { PayrollContext } from "./PayrollContext";
import { exportToCSV, exportToPDF } from "./exportUtils";
import "./styles/PayrollReports.css";

function PayrollReports() {
  const { payrollRuns } = useContext(PayrollContext);

  if (payrollRuns.length === 0) {
    return (
      <section className="payroll-reports">
        <h2>Payroll Reports</h2>
        <p>No payroll runs available yet.</p>
      </section>
    );
  }

  return (
    <section className="payroll-reports">
      <h2>Payroll Reports</h2>
      {payrollRuns.map((run) => {
        const totalGross = run.results.reduce((sum, r) => sum + r.grossPay, 0);
        const totalDeductions = run.results.reduce((sum, r) => sum + r.deductions, 0);
        const totalBenefits = run.results.reduce((sum, r) => sum + r.benefits, 0);
        const totalNet = run.results.reduce((sum, r) => sum + r.netPay, 0);

        return (
          <div key={run.id} className="report-card" id={`report-${run.id}`}>
            <h3>Period: {run.period}</h3>
            <table>
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
                  <td>₱{totalGross.toLocaleString()}</td>
                  <td>₱{totalDeductions.toLocaleString()}</td>
                  <td>₱{totalBenefits.toLocaleString()}</td>
                  <td>₱{totalNet.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h4>Employee Breakdown</h4>
            <table>
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
                {run.results.map((res) => (
                  <tr key={res.employeeId}>
                    <td>{res.name}</td>
                    <td>₱{res.grossPay.toLocaleString()}</td>
                    <td>₱{res.deductions.toLocaleString()}</td>
                    <td>₱{res.benefits.toLocaleString()}</td>
                    <td>₱{res.netPay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Export Buttons */}
            <div className="export-buttons">
              <button onClick={() => exportToCSV(run.results, `Payroll-${run.period}`)}>
                Export CSV
              </button>
              <button onClick={() => exportToPDF(`report-${run.id}`, `Payroll-${run.period}`)}>
                Export PDF
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default PayrollReports;