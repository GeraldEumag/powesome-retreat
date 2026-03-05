import React, { createContext, useState, useEffect } from "react";

export const HotelContext = createContext();

export function HotelProvider({ children }) {
  const [hotelBookings, setHotelBookings] = useState([
    {
      id: 1,
      customer: "John Doe",
      petName: "Bella",
      petType: "Dog",
      checkIn: "2026-03-05",
      checkOut: "2026-03-07",
      room: "Deluxe",
      status: "Confirmed",
      price: 1500
    }
  ]);

  // ✅ Add booking
  const addBooking = (booking) => {
    setHotelBookings((prev) => [...prev, { id: prev.length + 1, ...booking }]);
  };

  // ✅ Update booking
  const updateBooking = (updated) => {
    setHotelBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
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
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) setHotelBookings(parsed);
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(hotelBookings));
  }, [hotelBookings]);

  return (
    <HotelContext.Provider
      value={{
        hotelBookings,
        setHotelBookings, // ✅ expose setter
        addBooking,
        updateBooking,
        deleteBooking
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}