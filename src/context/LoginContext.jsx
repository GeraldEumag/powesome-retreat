import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, user: "Admin User", role: "Administrator", status: "Success", time: "2026-02-25 09:30 AM" },
    { id: 2, user: "Sarah Johnson", role: "Receptionist", status: "Success", time: "2026-02-25 08:15 AM" },
    { id: 3, user: "Mike Wilson", role: "Manager", status: "Failed", time: "2026-02-24 05:30 PM" },
  ]);

  // ✅ Store current user info
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Add login event and set current user
  const addLoginEvent = (event) => {
    const newEvent = { id: loginHistory.length + 1, ...event };
    setLoginHistory([...loginHistory, newEvent]);
    const userObj = { name: event.user, role: event.role };
    setCurrentUser(userObj);
    localStorage.setItem("currentUser", JSON.stringify(userObj));
  };

  // ✅ Add logout event and clear current user
  const addLogoutEvent = (user, role) => {
    const newEvent = {
      id: loginHistory.length + 1,
      user,
      role,
      status: "Logout",
      time: new Date().toLocaleString(),
    };
    setLoginHistory([...loginHistory, newEvent]);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loginHistory,
        currentUser,
        userInfo: currentUser, // ✅ alias for compatibility
        addLoginEvent,
        addLogoutEvent,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}