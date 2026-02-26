import React, { createContext, useState } from "react";

export const POSContext = createContext();

export function POSProvider({ children }) {
  const [transactions] = useState([
    { id: 1, customer: "Sarah Johnson", service: "Hotel Booking", amount: 5000, date: "2026-02-20" },
    { id: 2, customer: "Mike Chen", service: "Veterinary", amount: 2000, date: "2026-02-21" },
    { id: 3, customer: "Juan Dela Cruz", service: "Hotel Booking", amount: 3000, date: "2026-02-22" },
    { id: 4, customer: "Maria Santos", service: "Grooming", amount: 1500, date: "2026-02-22" },
  ]);

  return (
    <POSContext.Provider value={{ transactions }}>
      {children}
    </POSContext.Provider>
  );
}