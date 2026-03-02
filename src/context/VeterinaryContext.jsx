import React, { createContext, useState, useMemo } from "react";

export const VeterinaryContext = createContext();

export const VeterinaryProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([
    { id: "A001", customer: "Juan Dela Cruz", pet: "Dog - Max", date: "2026-02-26", time: "10:00 AM", status: "Confirmed", fee: 800 },
    { id: "A002", customer: "Maria Santos", pet: "Cat - Luna", date: "2026-02-27", time: "2:30 PM", status: "Pending", fee: 600 }
  ]);

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [customers, setCustomers] = useState([
    { id: "C001", name: "Juan Dela Cruz", contact: "juan@email.com", pets: [{ name: "Max", type: "Dog" }] },
    { id: "C002", name: "Maria Santos", contact: "maria@email.com", pets: [{ name: "Luna", type: "Cat" }] }
  ]);

  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ✅ Helper: calculate duration between Time In and Time Out
  const calculateDuration = (timeIn, timeOut) => {
    try {
      const [inHour, inMinute] = timeIn.split(":").map(Number);
      const [outHour, outMinute] = timeOut.split(":").map(Number);
      const inDate = new Date();
      const outDate = new Date();
      inDate.setHours(inHour, inMinute);
      outDate.setHours(outHour, outMinute);
      const diffMs = outDate - inDate;
      const diffMinutes = Math.floor(diffMs / 60000);
      return `${diffMinutes} min`;
    } catch {
      return null;
    }
  };

  // Appointments
  const addAppointment = (appointment) => setAppointments(prev => [...prev, appointment]);

  const updateAppointment = (id, updated) => {
    setAppointments(prev => {
      const newAppointments = prev.map(a => a.id === id ? { ...a, ...updated } : a);

      const appt = newAppointments.find(a => a.id === id);
      if (appt && updated.status === "Completed") {
        setMedicalHistory(history => {
          const exists = history.some(m => m.id === `MH-${id}`);
          if (!exists) {
            const recordsTotal = (updated.records || []).reduce((sum, r) => sum + (r.price || 0), 0);
            return [
              ...history,
              {
                id: `MH-${id}`,
                petName: appt.pet,
                owner: appt.customer,
                lastVisit: appt.date,
                diagnosis: updated.diagnosis || "General Checkup",
                treatment: updated.treatment || "Routine Care",
                fee: (appt.fee || 0) + recordsTotal,
                time: appt.time,
                timeIn: appt.timeIn || null,
                timeOut: appt.timeOut || null,
                duration: appt.timeIn && appt.timeOut ? calculateDuration(appt.timeIn, appt.timeOut) : null,
                records: updated.records || []
              }
            ];
          }
          return history;
        });
      }

      return newAppointments;
    });
  };

  const deleteAppointment = (id) => setAppointments(prev => prev.filter(a => a.id !== id));

  // Medical History (read-only, only delete)
  const deleteMedicalRecord = (id) =>
    setMedicalHistory(prev => prev.filter(m => m.id !== id));

  // Customers
  const addCustomer = (customer) => setCustomers(prev => [...prev, customer]);
  const updateCustomer = (id, updated) =>
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  const deleteCustomer = (id) =>
    setCustomers(prev => prev.filter(c => c.id !== id));

  // Reports
  const reports = useMemo(() => {
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(a => a.status === "Completed").length;
    const treatmentCount = {};
    medicalHistory.forEach(m => {
      treatmentCount[m.treatment] = (treatmentCount[m.treatment] || 0) + 1;
    });
    const mostCommonTreatment = Object.entries(treatmentCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    const totalRevenue = `₱${appointments.reduce((sum, a) => sum + (a.fee || 0), 0).toLocaleString()}`;
    const totalCustomers = customers.length;

    return [
      { metric: "Total Appointments", value: totalAppointments },
      { metric: "Completed Appointments", value: completedAppointments },
      { metric: "Most Common Treatment", value: mostCommonTreatment },
      { metric: "Total Revenue", value: totalRevenue },
      { metric: "Total Customers", value: totalCustomers }
    ];
  }, [appointments, medicalHistory, customers]);

  return (
    <VeterinaryContext.Provider
      value={{
        appointments, setAppointments,
        medicalHistory, setMedicalHistory,
        customers, setCustomers,
        addAppointment, updateAppointment, deleteAppointment,
        deleteMedicalRecord,
        addCustomer, updateCustomer, deleteCustomer,
        reports,
        selectedPet, setSelectedPet,
        selectedCustomer, setSelectedCustomer
      }}
    >
      {children}
    </VeterinaryContext.Provider>
  );
};