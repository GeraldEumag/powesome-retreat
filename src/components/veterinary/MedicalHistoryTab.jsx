import React, { useContext } from "react";
import { VeterinaryContext } from "../../context/VeterinaryContext";
import "../../styles/MedicalHistoryTab.css";

function MedicalHistoryTab({ exportToCSV, printSection }) {
  const { medicalHistory, deleteMedicalRecord } = useContext(VeterinaryContext);

  // ✅ Calculate grand total revenue
  const grandTotal = medicalHistory.reduce((sum, m) => sum + (m.fee || 0), 0);

  return (
    <section className="dashboard-section" id="medical-history-section">
      <h3>Medical History</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Pet Name</th><th>Owner</th><th>Last Visit</th>
              <th>Diagnosis</th><th>Treatment</th><th>Total Fee</th>
              <th>Time In</th><th>Time Out</th><th>Duration</th>
              <th>Records</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistory.length > 0 ? (
              <>
                {medicalHistory.map(m => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.petName}</td>
                    <td>{m.owner}</td>
                    <td>{m.lastVisit}</td>
                    <td>{m.diagnosis}</td>
                    <td>{m.treatment}</td>
                    <td><strong>₱{m.fee}</strong></td>
                    <td>{m.timeIn || "-"}</td>
                    <td>{m.timeOut || "-"}</td>
                    <td>{m.duration || "-"}</td>
                    <td>
                      {(m.records || []).length > 0 ? (
                        <ul>
                          {m.records.map((r, idx) => (
                            <li key={idx}>{r.item} – ₱{r.price}</li>
                          ))}
                        </ul>
                      ) : "No records"}
                    </td>
                    <td>
                      <button onClick={() => deleteMedicalRecord(m.id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
                {/* ✅ Summary Row */}
                <tr className="summary-row">
                  <td colSpan="6"><strong>Grand Total Revenue</strong></td>
                  <td colSpan="6"><strong>₱{grandTotal}</strong></td>
                </tr>
              </>
            ) : (
              <tr><td colSpan="12">No medical records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export & Print */}
      <div className="actions">
        <button onClick={() => exportToCSV(medicalHistory, "medical_history.csv")}>⬇ Export CSV</button>
        <button onClick={() => printSection("medical-history-section")}>🖨 Print</button>
      </div>
    </section>
  );
}

export default MedicalHistoryTab;