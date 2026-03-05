import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import EmailPayslip from "./EmailPayslip"; 
import "./styles/PayrollReports.css";

function PayrollReports() {
  const { payrollRuns, employees, exportReportCSV, exportReportPDF, generatePayslip } =
    useContext(PayrollContext);

  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [payslipToEmail, setPayslipToEmail] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [expandedRun, setExpandedRun] = useState(null); // ✅ collapse/expand

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (payrollRuns.length === 0) {
    return (
      <section className="payroll-reports">
        <h2>Payroll Reports</h2>
        <p>No payroll runs available yet. Run payroll to generate reports.</p>
      </section>
    );
  }

  return (
    <section className="payroll-reports">
      <h2>Payroll Reports</h2>

      {/* Employee Filter */}
      <div className="report-controls">
        <label>Filter by Employee: </label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="all">All Employees</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {payrollRuns.map((run) => {
        const filteredResults =
          selectedEmployee === "all"
            ? run.results
            : run.results.filter((res) => res.employeeId === parseInt(selectedEmployee));

        if (filteredResults.length === 0) return null;

        const totalGross = filteredResults.reduce((sum, r) => sum + r.grossPay, 0);
        const totalDeductions = filteredResults.reduce((sum, r) => sum + r.deductions, 0);
        const totalBenefits = filteredResults.reduce((sum, r) => sum + r.benefits, 0);
        const totalNet = filteredResults.reduce((sum, r) => sum + r.netPay, 0);

        return (
          <div key={run.id} className="report-card" id={`report-${run.id}`}>
            <h3>
              Period: {run.period}{" "}
              <button
                className="toggle-btn"
                onClick={() =>
                  setExpandedRun(expandedRun === run.id ? null : run.id)
                }
              >
                {expandedRun === run.id ? "Hide Breakdown" : "Show Breakdown"}
              </button>
            </h3>

            {/* Summary Table */}
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
                  <td>₱{totalGross.toLocaleString()}</td>
                  <td>₱{totalDeductions.toLocaleString()}</td>
                  <td>₱{totalBenefits.toLocaleString()}</td>
                  <td><strong>₱{totalNet.toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>

            {/* Employee Breakdown (collapsible) */}
            {expandedRun === run.id && (
              <>
                <h4>Employee Breakdown</h4>
                <div className="table-wrapper">
                  <table className="employee-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Gross Pay</th>
                        <th>Deductions</th>
                        <th>Benefits</th>
                        <th>Net Pay</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((res) => (
                        <tr key={res.employeeId}>
                          <td>{res.name}</td>
                          <td>₱{res.grossPay.toLocaleString()}</td>
                          <td>₱{res.deductions.toLocaleString()}</td>
                          <td>₱{res.benefits.toLocaleString()}</td>
                          <td><strong>₱{res.netPay.toLocaleString()}</strong></td>
                          <td>
                            <button
                              onClick={() =>
                                exportReportPDF(
                                  `report-${run.id}`,
                                  `Payslip-${res.name}-${run.period}`
                                )
                              }
                            >
                              Export Payslip
                            </button>
                            <button
                              onClick={() => {
                                const payslip = generatePayslip(res.employeeId, run.period);
                                if (payslip) {
                                  setPayslipToEmail(payslip);
                                } else {
                                  showToast("Failed to generate payslip.", "error");
                                }
                              }}
                            >
                              Email Payslip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Export Buttons */}
            <div className="export-buttons">
              <button onClick={() => exportReportCSV(run.period)}>Export CSV</button>
              <button onClick={() => exportReportPDF(`report-${run.id}`, run.period)}>
                Export PDF
              </button>
            </div>
          </div>
        );
      })}

      {/* ✅ Modal Popup for EmailPayslip */}
      {payslipToEmail && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EmailPayslip
              payslip={payslipToEmail}
              onClose={() => setPayslipToEmail(null)}
              onSent={(employeeName, period) =>
                showToast(`Payslip for ${employeeName} (${period}) emailed successfully!`, "success")
              }
              onError={(employeeName, period) =>
                showToast(`Failed to send payslip for ${employeeName} (${period}).`, "error")
              }
            />
            <button className="cancel-btn" onClick={() => setPayslipToEmail(null)}>
              Cancel / Back
            </button>
          </div>
        </div>
      )}

      {/* ✅ Toast Notification */}
      {toastMessage && <div className={`toast ${toastType}`}>{toastMessage}</div>}
    </section>
  );
}

export default PayrollReports;