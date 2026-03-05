import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/PayrollComparison.css";
import "./styles/PayrollDashboard.css";
function PayrollComparison() {
  const { payrollRuns } = useContext(PayrollContext);

  const [periodA, setPeriodA] = useState("");
  const [periodB, setPeriodB] = useState("");
  const [comparison, setComparison] = useState(null);

  const handleCompare = () => {
    if (!periodA || !periodB) return;

    const runA = payrollRuns.find(r => r.period === periodA);
    const runB = payrollRuns.find(r => r.period === periodB);

    if (!runA || !runB) {
      setComparison(null);
      return;
    }

    const totalsA = {
      gross: runA.results.reduce((sum, r) => sum + r.grossPay, 0),
      deductions: runA.results.reduce((sum, r) => sum + r.deductions, 0),
      benefits: runA.results.reduce((sum, r) => sum + r.benefits, 0),
      net: runA.results.reduce((sum, r) => sum + r.netPay, 0),
    };

    const totalsB = {
      gross: runB.results.reduce((sum, r) => sum + r.grossPay, 0),
      deductions: runB.results.reduce((sum, r) => sum + r.deductions, 0),
      benefits: runB.results.reduce((sum, r) => sum + r.benefits, 0),
      net: runB.results.reduce((sum, r) => sum + r.netPay, 0),
    };

    setComparison({ periodA, periodB, totalsA, totalsB });
  };

  return (
    <section className="payroll-comparison">
      <h2>Payroll Comparison</h2>

      {/* Comparison Form */}
      <div className="comparison-form">
        <input
          type="text"
          placeholder="First Period (e.g. Feb 1-15)"
          value={periodA}
          onChange={(e) => setPeriodA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Period (e.g. Mar 1-15)"
          value={periodB}
          onChange={(e) => setPeriodB(e.target.value)}
        />
        <button onClick={handleCompare}>Compare</button>
      </div>

      {/* Comparison Results */}
      {comparison ? (
        <div className="comparison-results">
          <h3>Comparison: {comparison.periodA} vs {comparison.periodB}</h3>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>{comparison.periodA}</th>
                <th>{comparison.periodB}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Gross Pay</td>
                <td>₱{comparison.totalsA.gross.toLocaleString()}</td>
                <td>₱{comparison.totalsB.gross.toLocaleString()}</td>
                <td>₱{(comparison.totalsB.gross - comparison.totalsA.gross).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Deductions</td>
                <td>₱{comparison.totalsA.deductions.toLocaleString()}</td>
                <td>₱{comparison.totalsB.deductions.toLocaleString()}</td>
                <td>₱{(comparison.totalsB.deductions - comparison.totalsA.deductions).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Benefits</td>
                <td>₱{comparison.totalsA.benefits.toLocaleString()}</td>
                <td>₱{comparison.totalsB.benefits.toLocaleString()}</td>
                <td>₱{(comparison.totalsB.benefits - comparison.totalsA.benefits).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Net Pay</td>
                <td><strong>₱{comparison.totalsA.net.toLocaleString()}</strong></td>
                <td><strong>₱{comparison.totalsB.net.toLocaleString()}</strong></td>
                <td><strong>₱{(comparison.totalsB.net - comparison.totalsA.net).toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No comparison yet. Enter two valid payroll periods.</p>
      )}
    </section>
  );
}

export default PayrollComparison;