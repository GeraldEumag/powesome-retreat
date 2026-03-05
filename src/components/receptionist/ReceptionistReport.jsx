import React, { useContext, useState } from "react";
import { HotelContext } from "../../context/HotelContext";
import { GroomingContext } from "../../context/GroomingContext";
import { UserContext } from "../../context/UserContext";
import "./ReceptionistStyles.css";

const ReceptionistReport = () => {
  const { hotelBookings } = useContext(HotelContext);
  const { groomingAppointments } = useContext(GroomingContext);
  const { users } = useContext(UserContext); // treat users as customerProfiles

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ✅ Generic sort function
  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // ✅ Generic search filter
  const filterData = (data) =>
    data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // ✅ Apply search + sort
  const hotelData = sortData(filterData(hotelBookings || []));
  const groomingData = sortData(filterData(groomingAppointments || []));
  const customerData = sortData(filterData(users || [])); // use users

  // ✅ Revenue calculations
  const hotelRevenue = hotelData.reduce((sum, b) => sum + (Number(b.price) || 0), 0);
  const groomingRevenue = groomingData.reduce((sum, a) => sum + (Number(a.price) || 0), 0);

  // ✅ Handle sorting toggle
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="receptionist-report">
      <h2>Receptionist Report</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by customer, pet, or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <div className="report-grid">
        <div className="report-card"><h3>Hotel Bookings</h3><p>Total: {hotelData.length}</p><p>Revenue: ₱{hotelRevenue.toLocaleString()}</p></div>
        <div className="report-card"><h3>Grooming Appointments</h3><p>Total: {groomingData.length}</p><p>Revenue: ₱{groomingRevenue.toLocaleString()}</p></div>
        <div className="report-card"><h3>Customer Profiles</h3><p>Total: {customerData.length}</p></div>
      </div>

      {/* Hotel Bookings Table */}
      <h3 style={{ marginTop: "20px" }}>Hotel Bookings</h3>
      <table className="receptionist-table">
        <thead>
          <tr>
            {["id","customer","petName","petType","checkIn","checkOut","room","status","price"].map(key => (
              <th key={key} onClick={() => requestSort(key)} style={{cursor:"pointer"}}>
                {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hotelData.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td><td>{b.customer}</td><td>{b.petName}</td><td>{b.petType}</td>
              <td>{b.checkIn}</td><td>{b.checkOut}</td><td>{b.room}</td><td>{b.status}</td>
              <td>₱{b.price?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grooming Appointments Table */}
      <h3 style={{ marginTop: "20px" }}>Grooming Appointments</h3>
      <table className="receptionist-table">
        <thead>
          <tr>
            {["id","customer","petName","petType","service","date","status","price"].map(key => (
              <th key={key} onClick={() => requestSort(key)} style={{cursor:"pointer"}}>
                {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groomingData.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.customer}</td><td>{a.petName}</td><td>{a.petType}</td>
              <td>{a.service}</td><td>{a.date}</td><td>{a.status}</td>
              <td>₱{a.price?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer Profiles Table */}
      <h3 style={{ marginTop: "20px" }}>Customer Profiles</h3>
      <table className="receptionist-table">
        <thead>
          <tr>
            {["initials","name","phone","email","role","status","lastLogin"].map(key => (
              <th key={key} onClick={() => requestSort(key)} style={{cursor:"pointer"}}>
                {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customerData.map(c => (
            <tr key={c.email}>
              <td>{c.initials}</td><td>{c.name}</td><td>{c.phone}</td><td>{c.email}</td>
              <td>{c.role}</td><td>{c.status}</td><td>{c.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceptionistReport;