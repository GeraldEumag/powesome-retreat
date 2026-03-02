import React, { createContext, useState, useEffect } from "react";

export const HotelContext = createContext();

export function HotelProvider({ children }) {
  const [hotelBookings, setHotelBookings] = useState([
    {
      id: 1,
      customer: "John Doe",
      pet: "Bella (Dog)",
      room: "Deluxe Suite",
      checkIn: "2026-02-25",
      checkOut: "2026-02-28",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      pet: "Milo (Cat)",
      room: "Standard Room",
      checkIn: "2026-02-26",
      checkOut: "2026-02-27",
      status: "Pending",
    },
  ]);

  // ✅ Add booking
  const addBooking = (booking) => {
    setHotelBookings((prev) => [...prev, { id: prev.length + 1, ...booking }]);
  };

  // ✅ Update booking
  const updateBooking = (updatedBooking) => {
    setHotelBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
  };

  // ✅ Delete booking
  const deleteBooking = (id) => {
    setHotelBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("hotelBookings");
    if (stored) {
      setHotelBookings(JSON.parse(stored));
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(hotelBookings));
  }, [hotelBookings]);

  return (
    <HotelContext.Provider
      value={{ hotelBookings, addBooking, updateBooking, deleteBooking }}
    >
      {children}
    </HotelContext.Provider>
  );
}