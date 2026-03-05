import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/EmployeeProfile.css";
import "./styles/PayrollDashboard.css";
function EmployeeProfile() {
  const { employees, attendance, deductions, benefits, generatePayslip } = useContext(PayrollContext);

  const [employeeId, setEmployeeId] = useState("");
  const [period, setPeriod] = useState("");
  const [payslip, setPayslip] = useState(null);

  const selectedEmployee = employees.find(emp => emp.id === parseInt(employeeId));

  const handleGeneratePayslip = () => {
    if (!employeeId || !period) return;
    const slip = generatePayslip(employeeId, period);
    setPayslip(slip);
  };

  return (
    <section className="employee-profile">
      <h2>Employee Profile</h2>

      {/* Employee Selector */}
      <div className="profile-form">
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

        <button onClick={handleGeneratePayslip}>Generate Payslip</button>
      </div>

      {/* Employee Details */}
      {selectedEmployee ? (
        <div className="profile-details">
          <h3>{selectedEmployee.name}</h3>
          <p><strong>Role:</strong> {selectedEmployee.role || "—"}</p>
          <p><strong>Base Salary:</strong> ₱{selectedEmployee.baseSalary.toLocaleString()}</p>

          {/* Attendance History */}
          <h4>Attendance History</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Overtime</th>
                <th>Status</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {attendance.filter(a => a.employeeId === selectedEmployee.id).map(rec => (
                <tr key={rec.id}>
                  <td>{rec.date}</td>
                  <td>{rec.hours}</td>
                  <td>{rec.overtime}</td>
                  <td>{rec.status}</td>
                  <td>{rec.period}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Deductions */}
          <h4>Deductions</h4>
          {deductions[selectedEmployee.id] ? (
            <ul>
              <li>SSS: ₱{deductions[selectedEmployee.id].sss.toLocaleString()}</li>
              <li>PhilHealth: ₱{deductions[selectedEmployee.id].philhealth.toLocaleString()}</li>
              <li>Pag-IBIG: ₱{deductions[selectedEmployee.id].pagibig.toLocaleString()}</li>
              <li>Tax: ₱{deductions[selectedEmployee.id].tax.toLocaleString()}</li>
            </ul>
          ) : <p>No deductions recorded.</p>}

          {/* Benefits */}
          <h4>Benefits</h4>
          {benefits[selectedEmployee.id] ? (
            <ul>
              <li>Allowance: ₱{benefits[selectedEmployee.id].allowance.toLocaleString()}</li>
              <li>Bonus: ₱{benefits[selectedEmployee.id].bonus.toLocaleString()}</li>
              <li>Incentive: ₱{benefits[selectedEmployee.id].incentive.toLocaleString()}</li>
            </ul>
          ) : <p>No benefits recorded.</p>}

          {/* Payslip */}
          {payslip && (
            <div className="payslip-card">
              <h4>Payslip for {payslip.period}</h4>
              <p><strong>Gross Pay:</strong> ₱{payslip.grossPay.toLocaleString()}</p>
              <p><strong>Deductions:</strong> ₱{payslip.deductions.toLocaleString()}</p>
              <p><strong>Benefits:</strong> ₱{payslip.benefits.toLocaleString()}</p>
              <p><strong>Net Pay:</strong> <span className="net-pay">₱{payslip.netPay.toLocaleString()}</span></p>
            </div>
          )}
        </div>
      ) : (
        <p>Select an employee to view their profile.</p>
      )}
    </section>
  );
}

export default EmployeeProfile;