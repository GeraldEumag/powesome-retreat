import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, user: "Admin User", role: "Administrator", status: "Success", time: "2026-02-25 09:30 AM" },
    { id: 2, user: "Sarah Johnson", role: "Receptionist", status: "Success", time: "2026-02-25 08:15 AM" },
    { id: 3, user: "Mike Wilson", role: "Manager", status: "Failed", time: "2026-02-24 05:30 PM" },
  ]);

  const addLoginEvent = (event) => {
    setLoginHistory([...loginHistory, { id: loginHistory.length + 1, ...event }]);
  };

  const addLogoutEvent = (user, role) => {
    setLoginHistory([
      ...loginHistory,
      {
        id: loginHistory.length + 1,
        user,
        role,
        status: "Logout",
        time: new Date().toLocaleString(),
      },
    ]);
  };

  return (
    <LoginContext.Provider value={{ loginHistory, addLoginEvent, addLogoutEvent }}>
      {children}
    </LoginContext.Provider>
  );
}