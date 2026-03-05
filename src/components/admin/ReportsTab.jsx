import React, { useContext, useState, useEffect } from "react";
import { HotelContext } from "../../context/HotelContext";
import { GroomingContext } from "../../context/GroomingContext";
import { SalesContext } from "../../context/SalesContext";
import { UserContext } from "../../context/UserContext";
import { VeterinaryContext } from "../../context/VeterinaryContext";
import "../../styles/ReportsTab.css";

function AdminReport() {
  const { hotelBookings = [] } = useContext(HotelContext) || {};
  const { groomingAppointments = [] } = useContext(GroomingContext) || {};
  const { sales = [] } = useContext(SalesContext) || {};
  const { users = [] } = useContext(UserContext) || {};
  const { appointments = [], medicalHistory = [] } = useContext(VeterinaryContext) || {};

  const [dateRange, setDateRange] = useState({ from: "2026-01-01", to: "2026-03-05" });
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const inRange = (date) =>
      new Date(date) >= new Date(dateRange.from) && new Date(date) <= new Date(dateRange.to);

    // Filtered data
    const filteredHotel = hotelBookings.filter(b => inRange(b.checkIn));
    const filteredGrooming = groomingAppointments.filter(a => inRange(a.date));
    const filteredSales = sales.filter(s => inRange(s.date));
    const filteredAppointments = appointments.filter(a => inRange(a.date));

    // Revenues
    const hotelRevenue = filteredHotel.reduce((sum, b) => sum + (Number(b.price) || 0), 0);
    const groomingRevenue = filteredGrooming.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const posRevenue = filteredSales.reduce((sum, s) => sum + (Number(s.total) || 0), 0);
    const vetRevenue = filteredAppointments
      .filter(a => a.status === "Completed")
      .reduce((sum, a) => sum + (Number(a.fee) || 0), 0);

    const globalRevenue = hotelRevenue + groomingRevenue + posRevenue + vetRevenue;

    // Completion rates
    const hotelCompletionRate = ((filteredHotel.filter(b => b.status === "Completed").length / filteredHotel.length) * 100 || 0).toFixed(1);
    const groomingCompletionRate = ((filteredGrooming.filter(a => a.status === "Completed").length / filteredGrooming.length) * 100 || 0).toFixed(1);
    const vetCompletionRate = ((filteredAppointments.filter(a => a.status === "Completed").length / filteredAppointments.length) * 100 || 0).toFixed(1);

    // Top service (POS)
    const serviceCount = {};
    filteredSales.forEach(s => {
      serviceCount[s.item] = (serviceCount[s.item] || 0) + 1;
    });
    const topService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // Top treatment (Vet)
    const treatmentCount = {};
    medicalHistory.forEach(m => {
      treatmentCount[m.treatment] = (treatmentCount[m.treatment] || 0) + 1;
    });
    const topTreatment = Object.entries(treatmentCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    setReports([
      { metric: "Global Revenue", value: `₱${globalRevenue.toLocaleString()}` },
      { metric: "Hotel Revenue", value: `₱${hotelRevenue.toLocaleString()}` },
      { metric: "Grooming Revenue", value: `₱${groomingRevenue.toLocaleString()}` },
      { metric: "POS Revenue", value: `₱${posRevenue.toLocaleString()}` },
      { metric: "Veterinary Revenue", value: `₱${vetRevenue.toLocaleString()}` },
      { metric: "Hotel Completion Rate", value: `${hotelCompletionRate}%` },
      { metric: "Grooming Completion Rate", value: `${groomingCompletionRate}%` },
      { metric: "Vet Completion Rate", value: `${vetCompletionRate}%` },
      { metric: "Top Service (POS)", value: topService },
      { metric: "Top Treatment (Vet)", value: topTreatment },
      { metric: "Total Customers", value: users.length }
    ]);
  }, [hotelBookings, groomingAppointments, sales, users, appointments, medicalHistory, dateRange]);

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
    setDateRange({ from: "2026-01-01", to: "2026-03-05" });
  };

  return (
    <section className="dashboard-section">
      <header className="reports-header">
        <h2>Admin Reports & Analytics</h2>
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

      <div className="reports-cards">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <h4>{report.metric}</h4>
            <p>{report.value}</p>
          </div>
        ))}
      </div>

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

export default AdminReport;