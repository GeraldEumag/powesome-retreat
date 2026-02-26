import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    { initials: "AU", name: "Admin User", email: "admin@powesome.com", phone: "0912-345-6789", role: "Administrator", status: "Active", lastLogin: "2026-02-12 09:30 AM" },
    { initials: "DM", name: "Dr. Martinez", email: "martinez@powesome.com", phone: "0923-456-7890", role: "Veterinarian", status: "Active", lastLogin: "2026-02-12 08:15 AM" },
    { initials: "SJ", name: "Sarah Johnson", email: "sarah@powesome.com", phone: "0945-678-9012", role: "Receptionist", status: "Active", lastLogin: "2026-02-11 05:30 PM" },
    { initials: "MW", name: "Mike Wilson", email: "mike@powesome.com", phone: "0956-789-0123", role: "Manager", status: "Inactive", lastLogin: "2026-02-10 08:00 AM" },
  ]);

  const addUser = (user) => setUsers([...users, user]);
  const updateUser = (updatedUser) =>
    setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
  const deleteUser = (email) =>
    setUsers(users.filter(u => u.email !== email));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}