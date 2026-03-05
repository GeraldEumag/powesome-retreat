import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import EmployeeProfile from "./EmployeeProfile";
import AttendanceForm from "./AttendanceForm";
import LeaveRequests from "./LeaveRequests";
import DeductionsTab from "./DeductionsTab";
import BenefitsTab from "./BenefitsTab";
import PayrollRun from "./PayrollRun";
import PayrollSummary from "./PayrollSummary";
import PayrollReports from "./PayrollReports";
import PayrollCharts from "./PayrollCharts";
import PayrollComparison from "./PayrollComparison";
import EmailPayslip from "./EmailPayslip";
import AttendanceTab from "./AttendanceTab";   // ✅ AdminDashboard AttendanceTab
import "./styles/PayrollDashboard.css";

function PayrollDashboard() {
  const [activeTab, setActiveTab] = useState("employees");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Shared attendance records state
  const [records, setRecords] = useState([]);

  const handleLogAttendance = (record) => {
    setRecords([...records, record]);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "employees":
        return (
          <>
            <EmployeeForm />
            <EmployeeList />
            <EmployeeProfile />
          </>
        );
      case "attendance":
        return (
          <>
            {/* Payroll Attendance Form */}
            <AttendanceForm onLog={handleLogAttendance} />

            {/* Leave Requests */}
            <LeaveRequests />

            {/* AdminDashboard AttendanceTab (display records) */}
            <AttendanceTab records={records} />
          </>
        );
      case "deductions":
        return <DeductionsTab />;
      case "benefits":
        return <BenefitsTab />;
      case "payroll":
        return (
          <>
            <PayrollRun />
            <PayrollSummary />
            <EmailPayslip />
          </>
        );
      case "reports":
        return <PayrollReports />;
      case "charts":
        return <PayrollCharts />;
      case "comparison":
        return <PayrollComparison />;
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <section className="payroll-dashboard">
      <h2>Payroll Dashboard</h2>

      {/* ✅ Hamburger only visible on mobile (hidden on desktop via CSS) */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* ✅ Navigation Tabs */}
      <nav className={`dashboard-tabs ${menuOpen ? "open" : ""}`}>
        <button
          className={activeTab === "employees" ? "active" : ""}
          onClick={() => { setActiveTab("employees"); setMenuOpen(false); }}
        >
          Employees
        </button>
        <button
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => { setActiveTab("attendance"); setMenuOpen(false); }}
        >
          Attendance
        </button>
        <button
          className={activeTab === "deductions" ? "active" : ""}
          onClick={() => { setActiveTab("deductions"); setMenuOpen(false); }}
        >
          Deductions
        </button>
        <button
          className={activeTab === "benefits" ? "active" : ""}
          onClick={() => { setActiveTab("benefits"); setMenuOpen(false); }}
        >
          Benefits
        </button>
        <button
          className={activeTab === "payroll" ? "active" : ""}
          onClick={() => { setActiveTab("payroll"); setMenuOpen(false); }}
        >
          Payroll
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => { setActiveTab("reports"); setMenuOpen(false); }}
        >
          Reports
        </button>
        <button
          className={activeTab === "charts" ? "active" : ""}
          onClick={() => { setActiveTab("charts"); setMenuOpen(false); }}
        >
          Charts
        </button>
        <button
          className={activeTab === "comparison" ? "active" : ""}
          onClick={() => { setActiveTab("comparison"); setMenuOpen(false); }}
        >
          Comparison
        </button>
      </nav>

      {/* Active Tab Content */}
      <div className="tab-content">{renderTab()}</div>
    </section>
  );
}

export default PayrollDashboard;