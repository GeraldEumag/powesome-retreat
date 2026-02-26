import React, { createContext, useState } from "react";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([
    { id: "PR001", name: "Premium Dog Food", price: 45.99, stock: 10 },
    { id: "PR002", name: "Cat Treats", price: 12.99, stock: 20 },
    { id: "PR003", name: "Dog Toy Ball", price: 8.99, stock: 15 },
    { id: "PR004", name: "Cat Scratching Post", price: 29.99, stock: 5 },
    { id: "PR005", name: "Pet Shampoo", price: 15.99, stock: 8 },
    { id: "PR006", name: "Nail Clippers", price: 9.99, stock: 12 },
    { id: "PR007", name: "Dog Collar", price: 18.99, stock: 7 },
    { id: "PR008", name: "Cat Litter", price: 22.99, stock: 25 }
  ]);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}