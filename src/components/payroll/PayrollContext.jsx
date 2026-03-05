// src/components/payroll/PayrollContext.js
import React, { createContext, useState } from "react";
import { exportToCSV, exportToPDF } from "./exportUtils";
import "./styles/PayrollDashboard.css";

export const PayrollContext = createContext();

export function PayrollProvider({ children }) {
  // Employees
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", baseSalary: 20000 },
    { id: 2, name: "Jane Smith", baseSalary: 25000 },
  ]);

  // Attendance Records
  const [attendance, setAttendance] = useState([]);

  // Leave Requests
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Deductions (per employee)
  const [deductions, setDeductions] = useState({});

  // Benefits (per employee)
  const [benefits, setBenefits] = useState({});

  // Payroll Runs
  const [payrollRuns, setPayrollRuns] = useState([]);

  // ✅ Employee Management
  const addEmployee = (employee) => {
    setEmployees([...employees, { id: Date.now(), ...employee }]);
  };

  // ✅ Attendance Management
  const logAttendance = (record) => {
    setAttendance([...attendance, { id: Date.now(), ...record }]);
  };

  const editAttendance = (id, updatedRecord) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...updatedRecord } : rec))
    );
  };

  const deleteAttendance = (id) => {
    setAttendance((prev) => prev.filter((rec) => rec.id !== id));
  };

  // ✅ Leave Management
  const submitLeaveRequest = (request) => {
    setLeaveRequests([
      ...leaveRequests,
      { id: Date.now(), status: "Pending", ...request },
    ]);
  };

  const approveLeave = (id, paid = false) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: paid ? "Approved-Paid" : "Approved-Unpaid" }
          : r
      )
    );
  };

  const rejectLeave = (id) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  // ✅ Deductions Management
  const updateDeductions = ({
    employeeId,
    sss = 0,
    philhealth = 0,
    pagibig = 0,
    tax = 0,
  }) => {
    setDeductions({
      ...deductions,
      [employeeId]: { sss, philhealth, pagibig, tax },
    });
  };

  // ✅ Benefits Management
  const updateBenefits = ({
    employeeId,
    allowance = 0,
    bonus = 0,
    incentive = 0,
  }) => {
    setBenefits({
      ...benefits,
      [employeeId]: { allowance, bonus, incentive },
    });
  };

  // ✅ Payroll Calculation Helper
  const calculatePayroll = (emp, period) => {
    const records = attendance.filter(
      (a) => a.employeeId === emp.id && a.period === period
    );

    const totalHours = records.reduce((sum, r) => sum + (r.hours || 0), 0);
    const totalOvertime = records.reduce((sum, r) => sum + (r.overtime || 0), 0);

    // Check leave requests for this employee + period
    const leaves = leaveRequests.filter(
      (l) =>
        l.employeeId === emp.id &&
        l.period === period &&
        l.status.includes("Approved")
    );
    const unpaidLeaves = leaves.filter(
      (l) => l.status === "Approved-Unpaid"
    ).length;

    // Example: reduce hours for unpaid leave (8 hours per day)
    const adjustedHours = totalHours - unpaidLeaves * 8;

    // Basic pay calculation
    const grossPay =
      emp.baseSalary + adjustedHours * 100 + totalOvertime * 150;

    const empDeduction =
      deductions[emp.id] || { sss: 0, philhealth: 0, pagibig: 0, tax: 0 };
    const totalDeductions =
      empDeduction.sss +
      empDeduction.philhealth +
      empDeduction.pagibig +
      empDeduction.tax;

    const empBenefit =
      benefits[emp.id] || { allowance: 0, bonus: 0, incentive: 0 };
    const totalBenefits =
      empBenefit.allowance + empBenefit.bonus + empBenefit.incentive;

    const netPay = grossPay - totalDeductions + totalBenefits;

    return {
      employeeId: emp.id,
      name: emp.name,
      period,
      hoursWorked: adjustedHours,
      overtime: totalOvertime,
      grossPay,
      deductions: totalDeductions,
      benefits: totalBenefits,
      netPay,
    };
  };

  // ✅ Payroll Run
  const runPayroll = (period) => {
    const results = employees.map((emp) => calculatePayroll(emp, period));
    const newRun = { id: Date.now(), period, results };
    setPayrollRuns([...payrollRuns, newRun]);
    return newRun;
  };

  // ✅ Payslip Generator
  const generatePayslip = (employeeId, period) => {
    const run = payrollRuns.find((r) => r.period === period);
    if (!run) return null;
    return run.results.find((res) => res.employeeId === parseInt(employeeId));
  };

  // ✅ Reports & Exports
  const generateReport = (period) =>
    payrollRuns.find((r) => r.period === period)?.results || [];

  const exportReportCSV = (period) => {
    const report = generateReport(period);
    if (report.length > 0) exportToCSV(report, `payroll-${period}`);
  };

  const exportReportPDF = (elementId, period) => {
    exportToPDF(elementId, `payroll-${period}`);
  };

  return (
    <PayrollContext.Provider
      value={{
        employees,
        attendance,
        leaveRequests,
        deductions,
        benefits,
        payrollRuns,
        addEmployee,
        logAttendance,
        editAttendance,
        deleteAttendance,
        submitLeaveRequest,
        approveLeave,
        rejectLeave,
        updateDeductions,
        updateBenefits,
        runPayroll,
        generatePayslip,
        generateReport,
        exportReportCSV,
        exportReportPDF,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
}