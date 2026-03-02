import React, { createContext, useState } from "react";

export const PayrollContext = createContext();

export function PayrollProvider({ children }) {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", baseSalary: 20000 },
    { id: 2, name: "Jane Smith", baseSalary: 25000 },
  ]);

  const [attendance, setAttendance] = useState([]);
  const [deductions, setDeductions] = useState({});
  const [benefits, setBenefits] = useState({});
  const [payrollRuns, setPayrollRuns] = useState([]);

  // ✅ Employee Management
  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  // ✅ Attendance Management
  const logAttendance = (record) => {
    setAttendance([...attendance, record]);
  };

  // ✅ Deductions Management
  const updateDeductions = ({ employeeId, sss, philhealth, pagibig, tax }) => {
    setDeductions({
      ...deductions,
      [employeeId]: { sss, philhealth, pagibig, tax },
    });
  };

  // ✅ Benefits Management
  const updateBenefits = ({ employeeId, allowance, bonus, incentive }) => {
    setBenefits({
      ...benefits,
      [employeeId]: { allowance, bonus, incentive },
    });
  };

  // ✅ Payroll Calculation
  const runPayroll = (period) => {
    const results = employees.map((emp) => {
      const grossPay = emp.baseSalary;

      const empDeduction = deductions[emp.id] || { sss: 0, philhealth: 0, pagibig: 0, tax: 0 };
      const totalDeductions = empDeduction.sss + empDeduction.philhealth + empDeduction.pagibig + empDeduction.tax;

      const empBenefit = benefits[emp.id] || { allowance: 0, bonus: 0, incentive: 0 };
      const totalBenefits = empBenefit.allowance + empBenefit.bonus + empBenefit.incentive;

      const netPay = grossPay - totalDeductions + totalBenefits;

      return {
        employeeId: emp.id,
        name: emp.name,
        period,
        grossPay,
        deductions: totalDeductions,
        benefits: totalBenefits,
        netPay,
      };
    });

    const newRun = { id: payrollRuns.length + 1, period, results };
    setPayrollRuns([...payrollRuns, newRun]);
    return newRun;
  };

  // ✅ Payslip Generator
  const generatePayslip = (employeeId, period) => {
    const run = payrollRuns.find((r) => r.period === period);
    if (!run) return null;
    return run.results.find((res) => res.employeeId === parseInt(employeeId));
  };

  return (
    <PayrollContext.Provider
      value={{
        employees,
        attendance,
        deductions,
        benefits,
        payrollRuns,
        addEmployee,
        logAttendance,
        updateDeductions,
        updateBenefits,
        runPayroll,
        generatePayslip,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
}