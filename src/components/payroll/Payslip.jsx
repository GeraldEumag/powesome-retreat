import React, { useContext } from "react";
import { PayrollContext } from "../../components/payroll/PayrollContext";
import jsPDF from "jspdf";

function Payslip({ employeeId, period }) {
  const { generatePayslip } = useContext(PayrollContext);
  const payslip = generatePayslip(employeeId, period);

  if (!payslip) return <p>No payslip found for this period.</p>;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Payslip for ${payslip.name}`, 10, 10);
    doc.text(`Period: ${payslip.period}`, 10, 20);
    doc.text(`Gross Pay: ₱${payslip.grossPay}`, 10, 30);
    doc.text(`Deductions: ₱${payslip.deductions}`, 10, 40);
    doc.text(`Benefits: ₱${payslip.benefits}`, 10, 50);
    doc.text(`Net Pay: ₱${payslip.netPay}`, 10, 60);
    doc.save(`Payslip_${payslip.name}_${payslip.period}.pdf`);
  };

  return (
    <div className="payslip">
      <h3>Payslip for {payslip.name}</h3>
      <p>Period: {payslip.period}</p>
      <table>
        <tbody>
          <tr><td>Gross Pay</td><td>₱{payslip.grossPay.toLocaleString()}</td></tr>
          <tr><td>Total Deductions</td><td>₱{payslip.deductions.toLocaleString()}</td></tr>
          <tr><td>Total Benefits</td><td>₱{payslip.benefits.toLocaleString()}</td></tr>
          <tr><td><strong>Net Pay</strong></td><td><strong>₱{payslip.netPay.toLocaleString()}</strong></td></tr>
        </tbody>
      </table>
      {/* ✅ Export button */}
      <button onClick={exportPDF}>Export to PDF</button>
    </div>
  );
}

export default Payslip;