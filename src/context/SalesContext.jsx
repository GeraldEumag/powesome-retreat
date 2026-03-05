import React, { createContext, useState, useEffect } from "react";

export const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);

  const recordSale = (order, total) => {
    const newSale = {
      id: sales.length + 1,
      order,
      total,
      date: new Date().toLocaleString(),
    };
    setSales((prev) => [...prev, newSale]);
  };

  const deleteSale = (id) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    const stored = localStorage.getItem("sales");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) setSales(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  return (
    <SalesContext.Provider value={{ sales, recordSale, deleteSale }}>
      {children}
    </SalesContext.Provider>
  );
}