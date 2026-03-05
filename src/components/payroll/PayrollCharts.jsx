import React, { useContext } from "react";
import { PayrollContext } from "./PayrollContext";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./styles/PayrollDashboard.css";
import "./styles/PayrollCharts.css";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

function PayrollCharts() {
  const { payrollRuns } = useContext(PayrollContext);

  if (payrollRuns.length === 0) {
    return (
      <section className="payroll-charts">
        <h2>Payroll Charts</h2>
        <p>No payroll data available yet. Run payroll to generate charts.</p>
      </section>
    );
  }

  // Prepare data for charts
  const periods = payrollRuns.map(run => run.period);
  const grossTotals = payrollRuns.map(run =>
    run.results.reduce((sum, r) => sum + r.grossPay, 0)
  );
  const deductionTotals = payrollRuns.map(run =>
    run.results.reduce((sum, r) => sum + r.deductions, 0)
  );
  const benefitTotals = payrollRuns.map(run =>
    run.results.reduce((sum, r) => sum + r.benefits, 0)
  );
  const netTotals = payrollRuns.map(run =>
    run.results.reduce((sum, r) => sum + r.netPay, 0)
  );

  // Bar Chart: Gross vs Net Pay per period
  const barData = {
    labels: periods,
    datasets: [
      {
        label: "Gross Pay",
        data: grossTotals,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      },
      {
        label: "Net Pay",
        data: netTotals,
        backgroundColor: "rgba(153, 102, 255, 0.6)"
      }
    ]
  };

  // Line Chart: Deductions and Benefits trend
  const lineData = {
    labels: periods,
    datasets: [
      {
        label: "Deductions",
        data: deductionTotals,
        borderColor: "rgba(255, 99, 132, 0.8)",
        fill: false
      },
      {
        label: "Benefits",
        data: benefitTotals,
        borderColor: "rgba(54, 162, 235, 0.8)",
        fill: false
      }
    ]
  };

  // Pie Chart: Latest period breakdown
  const latestRun = payrollRuns[payrollRuns.length - 1];
  const latestGross = latestRun.results.reduce((sum, r) => sum + r.grossPay, 0);
  const latestDeductions = latestRun.results.reduce((sum, r) => sum + r.deductions, 0);
  const latestBenefits = latestRun.results.reduce((sum, r) => sum + r.benefits, 0);
  const latestNet = latestRun.results.reduce((sum, r) => sum + r.netPay, 0);

  const pieData = {
    labels: ["Gross Pay", "Deductions", "Benefits", "Net Pay"],
    datasets: [
      {
        data: [latestGross, latestDeductions, latestBenefits, latestNet],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)"
        ]
      }
    ]
  };

  return (
    <section className="payroll-charts">
      <h2>Payroll Charts</h2>

      <div className="chart-container">
        <h3>Gross vs Net Pay (Bar Chart)</h3>
        <Bar data={barData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className="chart-container">
        <h3>Deductions vs Benefits Trend (Line Chart)</h3>
        <Line data={lineData} options={{ maintainAspectRatio: false }} />
      </div>

      <div className="chart-container">
        <h3>Latest Period Breakdown (Pie Chart)</h3>
        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
      </div>
    </section>
  );
}

export default PayrollCharts;