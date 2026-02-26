import React, { createContext, useState } from "react";

export const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);

  const recordSale = (order, total) => {
    const newSale = {
      id: "S" + (sales.length + 1).toString().padStart(3, "0"),
      items: order,
      total,
      date: new Date().toLocaleString()
    };
    setSales([...sales, newSale]);
  };

  return (
    <SalesContext.Provider value={{ sales, recordSale }}>
      {children}
    </SalesContext.Provider>
  );
}