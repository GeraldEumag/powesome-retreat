import React, { createContext, useState, useEffect } from "react";

export const POSContext = createContext();

export function POSProvider({ children }) {
  const [sales, setSales] = useState([
    {
      id: 1,
      customer: "John Doe",
      item: "Hotel Booking",
      amount: 1500,
      date: "2026-03-05",
      status: "Paid"
    },
    {
      id: 2,
      customer: "Jane Smith",
      item: "Grooming Service",
      amount: 500,
      date: "2026-03-06",
      status: "Paid"
    }
  ]);

  // ✅ Record a new sale
  const recordSale = (sale) => {
    setSales((prev) => [...prev, { id: prev.length + 1, ...sale }]);
  };

  // ✅ Delete a sale
  const deleteSale = (id) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sales");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) setSales(parsed);
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  return (
    <POSContext.Provider value={{ sales, recordSale, deleteSale }}>
      {children}
    </POSContext.Provider>
  );
}