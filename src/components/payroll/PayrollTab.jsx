import React, { useContext, useState } from "react";
import { PayrollContext } from "../../components/payroll/PayrollContext";
import Payslip from "./Payslip";
import "./styles/PayrollDashboard.css";
function PayrollTab() {
  const { employees, payrollRuns, runPayroll } = useContext(PayrollContext);
  const [period, setPeriod] = useState("March 2026");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const handleRunPayroll = () => {
    runPayroll(period);
  };

  return (
    <section className="dashboard-section">
      <h3>Payroll Runs</h3>

      {/* Run Payroll Controls */}
      <div className="payroll-controls">
        <label>
          Period:
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </label>
        <button onClick={handleRunPayroll}>Run Payroll</button>
      </div>

      {/* Payroll Runs Table */}
      {payrollRuns.length === 0 ? (
        <p>No payroll runs yet. Click "Run Payroll" above.</p>
      ) : (
        payrollRuns.map((run) => (
          <div key={run.id}>
            <h4>Period: {run.period}</h4>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Gross Pay</th>
                  <th>Deductions</th>
                  <th>Benefits</th>
                  <th>Net Pay</th>
                  <th>Action</th>
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
                    <td>
                      <button
                        onClick={() => {
                          setSelectedEmployee(res.employeeId);
                          setSelectedPeriod(run.period);
                        }}
                      >
                        View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Payslip Viewer */}
      {selectedEmployee && (
        <Payslip employeeId={selectedEmployee} period={selectedPeriod} />
      )}
    </section>
  );
}

export default PayrollTab;