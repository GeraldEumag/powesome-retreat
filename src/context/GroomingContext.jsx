import React, { createContext, useState, useEffect } from "react";

export const GroomingContext = createContext();

export function GroomingProvider({ children }) {
  const sampleData = [
    {
      id: 1,
      customer: "John Doe",
      petName: "Bella",
      petType: "Dog",
      service: "Full Groom",
      date: "2026-03-05",
      status: "Confirmed",
      price: 800
    },
    {
      id: 2,
      customer: "Jane Smith",
      petName: "Milo",
      petType: "Cat",
      service: "Bath & Nail Trim",
      date: "2026-03-06",
      status: "Pending",
      price: 500
    }
  ];

  const [groomingAppointments, setGroomingAppointments] = useState(sampleData);

  // ✅ Add appointment
  const addAppointment = (appointment) => {
    setGroomingAppointments((prev) => [
      ...prev,
      { id: prev.length + 1, ...appointment }
    ]);
  };

  // ✅ Update appointment
  const updateAppointment = (updated) => {
    setGroomingAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  // ✅ Delete appointment
  const deleteAppointment = (id) => {
    setGroomingAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // ✅ Load from localStorage (but fallback to sampleData if empty)
  useEffect(() => {
    const stored = localStorage.getItem("groomingAppointments");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setGroomingAppointments(parsed);
      }
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "groomingAppointments",
      JSON.stringify(groomingAppointments)
    );
  }, [groomingAppointments]);

  return (
    <GroomingContext.Provider
      value={{
        groomingAppointments,
        setGroomingAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment
      }}
    >
      {children}
    </GroomingContext.Provider>
  );
}