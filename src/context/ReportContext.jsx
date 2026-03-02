import React, { createContext, useState } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  // ✅ Receptionist data
  const [hotelBookings, setHotelBookings] = useState([
    { id: 1, customer: "Sarah Johnson", petName: "Max", petType: "Dog", checkIn: "2026-02-20", checkOut: "2026-02-27", room: "Suite 101", status: "Active" },
    { id: 2, customer: "Tom Baker", petName: "Whiskers", petType: "Cat", checkIn: "2026-02-22", checkOut: "2026-02-25", room: "Room 204", status: "Active" }
  ]);

  const [groomingAppointments, setGroomingAppointments] = useState([
    { id: 1, customer: "Anna Cruz", petName: "Buddy", petType: "Dog", service: "Full Groom", date: "2026-02-22", status: "Scheduled" },
    { id: 2, customer: "Mark Lee", petName: "Luna", petType: "Cat", service: "Bath & Trim", date: "2026-02-23", status: "Completed" }
  ]);

  // ✅ Renamed from petProfiles → customerProfiles
  const [customerProfiles, setCustomerProfiles] = useState([
    { id: 1, name: "Anna Cruz", contact: "09123456789", email: "anna@example.com", petCount: 1, status: "Pending" },
    { id: 2, name: "Mark Lee", contact: "09987654321", email: "mark@example.com", petCount: 2, status: "Completed" }
  ]);

  // ✅ POS transactions
  const [transactions, setTransactions] = useState([
    { id: 1, customer: "Sarah Johnson", service: "Hotel Booking", amount: 5000, date: "2026-02-20" },
    { id: 2, customer: "Tom Baker", service: "Grooming", amount: 1500, date: "2026-02-22" }
  ]);

  return (
    <ReportContext.Provider
      value={{
        hotelBookings,
        setHotelBookings,
        groomingAppointments,
        setGroomingAppointments,
        customerProfiles,       // ✅ updated
        setCustomerProfiles,    // ✅ updated
        transactions,
        setTransactions
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};