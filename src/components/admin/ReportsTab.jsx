import React, { useContext, useState, useEffect } from "react";
import { ReportContext } from "../../context/ReportContext"; 
import { VeterinaryContext } from "../../context/VeterinaryContext"; 
import "../../styles/ReportsTab.css";

function ReportsTab() {
  // ✅ Safe destructuring for ReportContext
  const reportContext = useContext(ReportContext) || {};
  const {
    hotelBookings = [],
    groomingAppointments = [],
    customerProfiles = [],
    transactions = []
  } = reportContext;

  // ✅ Safe destructuring for VeterinaryContext
  const vetContext = useContext(VeterinaryContext) || {};
  const {
    appointments = [],
    medicalHistory = [],
    customers = []
  } = vetContext;

  const [dateRange, setDateRange] = useState({ from: "2026-01-01", to: "2026-02-12" });
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const inRange = (date) =>
      new Date(date) >= new Date(dateRange.from) && new Date(date) <= new Date(dateRange.to);

    // ✅ Filtered data
    const filteredHotel = hotelBookings.filter(b => inRange(b.checkIn));
    const filteredGrooming = groomingAppointments.filter(a => inRange(a.date));
    const filteredCustomers = customerProfiles;
    const filteredTx = transactions.filter(t => inRange(t.date));

    // ✅ POS metrics
    const totalRevenuePOS = filteredTx.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const totalBookings = filteredTx.length;
    const newCustomers = new Set(filteredTx.map(t => t.customer)).size;
    const avgRevenuePerDay = (
      totalRevenuePOS / new Set(filteredTx.map(t => t.date)).size || 0
    ).toFixed(2);

    const serviceCount = {};
    filteredTx.forEach(t => {
      serviceCount[t.service] = (serviceCount[t.service] || 0) + 1;
    });
    const topService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // ✅ Receptionist Revenue
    const hotelRevenue = filteredHotel.reduce((sum, b) => sum + (Number(b.price) || 0), 0);
    const groomingRevenue = filteredGrooming.reduce((sum, a) => sum + (Number(a.price) || 0), 0);

    // ✅ Veterinary Revenue
    const filteredAppointments = appointments.filter(a => inRange(a.date));
    const veterinaryRevenue = filteredAppointments
      .filter(a => a.status === "Completed")
      .reduce((sum, a) => sum + (Number(a.fee) || 0), 0);

    const completedAppointments = filteredAppointments.filter(a => a.status === "Completed").length;
    const totalAppointments = filteredAppointments.length;

    const treatmentCount = {};
    medicalHistory.forEach(m => {
      treatmentCount[m.treatment] = (treatmentCount[m.treatment] || 0) + 1;
    });
    const topTreatment = Object.entries(treatmentCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // ✅ Global Revenue
    const globalRevenue = totalRevenuePOS + hotelRevenue + groomingRevenue + veterinaryRevenue;

    // ✅ Completion rates
    const completedHotel = filteredHotel.filter(b => b.status === "Completed");
    const completedGrooming = filteredGrooming.filter(a => a.status === "Completed");
    const completedCustomers = filteredCustomers.filter(c => c.status === "Completed");

    const hotelCompletionRate = ((completedHotel.length / filteredHotel.length) * 100 || 0).toFixed(1);
    const groomingCompletionRate = ((completedGrooming.length / filteredGrooming.length) * 100 || 0).toFixed(1);
    const customerCompletionRate = ((completedCustomers.length / filteredCustomers.length) * 100 || 0).toFixed(1);
    const vetCompletionRate = ((completedAppointments / totalAppointments) * 100 || 0).toFixed(1);

    // ✅ Update reports state
    setReports([
      { metric: "Global Revenue (POS + Receptionist + Veterinary)", value: `₱${globalRevenue.toLocaleString()}` },
      { metric: "Total Revenue (POS)", value: `₱${totalRevenuePOS.toLocaleString()}` },
      { metric: "Hotel Revenue", value: `₱${hotelRevenue.toLocaleString()}` },
      { metric: "Grooming Revenue", value: `₱${groomingRevenue.toLocaleString()}` },
      { metric: "Veterinary Revenue", value: `₱${veterinaryRevenue.toLocaleString()}` },
      { metric: "Total Bookings (POS)", value: totalBookings },
      { metric: "New Customers (POS)", value: newCustomers },
      { metric: "Avg Revenue/Day (POS)", value: `₱${avgRevenuePerDay}` },
      { metric: "Top Service (POS)", value: topService },
      { metric: "Hotel Bookings (Completed)", value: `${completedHotel.length} / ${filteredHotel.length} (${hotelCompletionRate}%)` },
      { metric: "Grooming Appointments (Completed)", value: `${completedGrooming.length} / ${filteredGrooming.length} (${groomingCompletionRate}%)` },
      { metric: "Customers (Completed)", value: `${completedCustomers.length} / ${filteredCustomers.length} (${customerCompletionRate}%)` },
      { metric: "Vet Appointments (Completed)", value: `${completedAppointments} / ${totalAppointments} (${vetCompletionRate}%)` },
      { metric: "Top Treatment (Vet)", value: topTreatment }
    ]);
  }, [transactions, hotelBookings, groomingAppointments, customerProfiles, appointments, medicalHistory, dateRange]);

  // ✅ Quick filter helpers
  const setLast7Days = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    setDateRange({ from: lastWeek.toISOString().split("T")[0], to: today.toISOString().split("T")[0] });
  };

  const setThisMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    setDateRange({ from: firstDay.toISOString().split("T")[0], to: today.toISOString().split("T")[0] });
  };

  const setYearToDate = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), 0, 1);
    setDateRange({ from: firstDay.toISOString().split("T")[0], to: today.toISOString().split("T")[0] });
  };

  const resetRange = () => {
    setDateRange({ from: "2026-01-01", to: "2026-02-12" }); // ✅ Reset to default
  };

  return (
    <section className="dashboard-section">
      <header className="reports-header">
        <h2>Reports & Analytics</h2>
        <p>Business insights and performance metrics</p>
        <div className="report-controls">
          <label>
            Report Period:
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
            —
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
          </label>
          <div className="quick-filters">
            <button onClick={setLast7Days}>Last 7 Days</button>
            <button onClick={setThisMonth}>This Month</button>
            <button onClick={setYearToDate}>Year to Date</button>
            <button onClick={resetRange}>Reset Range</button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="reports-cards">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <h4>{report.metric}</h4>
            <p>{report.value}</p>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr><th>Metric</th><th>Value</th></tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.metric}</td>
              <td>{report.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ReportsTab;
