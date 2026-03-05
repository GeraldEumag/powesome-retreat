import React, { useContext, useState } from "react";
import { PayrollContext } from "./PayrollContext";
import "./styles/EmployeeForm.css";
import "./styles/PayrollDashboard.css";
function EmployeeForm() {
  const { addEmployee } = useContext(PayrollContext);

  const [form, setForm] = useState({
    name: "",
    role: "",
    baseSalary: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || form.baseSalary <= 0) return;

    addEmployee(form);
    setForm({ name: "", role: "", baseSalary: 0 });
  };

  return (
    <section className="employee-form-section">
      <h2>Add New Employee</h2>

      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Role/Position"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          type="number"
          placeholder="Base Salary"
          value={form.baseSalary}
          onChange={(e) => setForm({ ...form, baseSalary: Number(e.target.value) })}
        />

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}

export default EmployeeForm;