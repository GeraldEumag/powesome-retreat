// src/context/POSContext.jsx
import React, { createContext, useState } from "react";
import { ReportProvider, ReportContext } from "./ReportContext";

export const POSContext = createContext();

export const POSProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, customer: "Sarah Johnson", service: "Hotel Booking", amount: 5000, date: "2026-02-20" },
    { id: 2, customer: "Tom Baker", service: "Grooming", amount: 1500, date: "2026-02-22" }
  ]);

  return (
    <ReportProvider>
      <ReportContext.Consumer>
        {({ hotelBookings, setHotelBookings, groomingAppointments, setGroomingAppointments, customerProfiles, setCustomerProfiles }) => (
          <POSContext.Provider
            value={{
              transactions,
              setTransactions,
              receptionistData: {
                hotelBookings,
                setHotelBookings,
                groomingAppointments,
                setGroomingAppointments,
                customerProfiles,
                setCustomerProfiles
              }
            }}
          >
            {children}
          </POSContext.Provider>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};