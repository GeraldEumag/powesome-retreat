import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/EmployeeList.css";
import "./styles/PayrollDashboard.css";
function EmployeeList() {
  const { employees, setEmployees } = useContext(PayrollContext);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", baseSalary: 0 });

  // ✅ Delete Employee
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // ✅ Start Editing
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, role: emp.role || "", baseSalary: emp.baseSalary });
  };

  // ✅ Save Edit
  const handleSave = () => {
    setEmployees(employees.map(emp =>
      emp.id === editingId ? { ...emp, ...form } : emp
    ));
    setEditingId(null);
    setForm({ name: "", role: "", baseSalary: 0 });
  };

  return (
    <section className="employee-list">
      <h2>Employee List</h2>

      {employees.length > 0 ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Base Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>
                  {editingId === emp.id ? (
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  ) : (
                    emp.name
                  )}
                </td>
                <td>
                  {editingId === emp.id ? (
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  ) : (
                    emp.role || "—"
                  )}
                </td>
                <td>
                  {editingId === emp.id ? (
                    <input
                      type="number"
                      value={form.baseSalary}
                      onChange={(e) => setForm({ ...form, baseSalary: Number(e.target.value) })}
                    />
                  ) : (
                    `₱${emp.baseSalary.toLocaleString()}`
                  )}
                </td>
                <td>
                  {editingId === emp.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(emp)}>Edit</button>
                      <button onClick={() => handleDelete(emp.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found. Add employees using the Employee Form.</p>
      )}
    </section>
  );
}

export default EmployeeList;