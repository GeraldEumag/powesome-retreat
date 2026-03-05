import React, { createContext, useState, useEffect } from "react";

// ✅ Named export for the context
export const UserContext = createContext();

// ✅ Named export for the provider
export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    {
      initials: "AU",
      name: "Admin User",
      email: "admin@pawesome.com",
      phone: "09123456789",
      role: "Administrator",
      status: "Active",
      lastLogin: "2026-02-25 09:30 AM",
    },
    {
      initials: "SJ",
      name: "Sarah Johnson",
      email: "sarah@pawesome.com",
      phone: "09987654321",
      role: "Receptionist",
      status: "Active",
      lastLogin: "2026-02-25 08:15 AM",
    },
  ]);

  // ✅ Update user
  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
  };

  // ✅ Delete user
  const deleteUser = (email) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  };

  // ✅ Load from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <UserContext.Provider value={{ users, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}