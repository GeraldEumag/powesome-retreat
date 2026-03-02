import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/EmployeeList.css";

function EmployeeList() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useContext(PayrollContext);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    salaryType: "monthly",
    salary: 0,
    rate: 0,
    deductions: 0
  });

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.position) return;
    addEmployee(newEmployee);
    setNewEmployee({ name: "", position: "", salaryType: "monthly", salary: 0, rate: 0, deductions: 0 });
  };

  return (
    <section className="employee-list">
      <h2>Employee Management</h2>

      {/* Add Employee Form */}
      <div className="employee-form">
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <select
          value={newEmployee.salaryType}
          onChange={(e) => setNewEmployee({ ...newEmployee, salaryType: e.target.value })}
        >
          <option value="monthly">Monthly</option>
          <option value="hourly">Hourly</option>
        </select>
        <input
          type="number"
          placeholder="Salary / Rate"
          value={newEmployee.salaryType === "monthly" ? newEmployee.salary : newEmployee.rate}
          onChange={(e) =>
            setNewEmployee(
              newEmployee.salaryType === "monthly"
                ? { ...newEmployee, salary: Number(e.target.value) }
                : { ...newEmployee, rate: Number(e.target.value) }
            )
          }
        />
        <button onClick={handleAdd}>Add Employee</button>
      </div>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary Type</th>
            <th>Salary/Rate</th>
            <th>Deductions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.salaryType}</td>
              <td>{emp.salaryType === "monthly" ? `₱${emp.salary}` : `₱${emp.rate}/hr`}</td>
              <td>₱{emp.deductions}</td>
              <td>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                {/* Later: add edit functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EmployeeList;