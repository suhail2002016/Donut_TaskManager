// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { FaCog, FaTasks, FaBuilding } from 'react-icons/fa';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import '../Styles/dashboard_admin.css'; // keep using your existing CSS

// If you have a central colors map, reuse it. Otherwise define here:
const DEPT_OPTIONS = ["GST", "Income Tax", "ROC", "Certifications", "Customer Details"];

const newId = (prefix="E") => `${prefix}${Date.now().toString().slice(-6)}`;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ---- Create User modal state ----
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    role: "Staff",
  });
  const [formError, setFormError] = useState("");

  // optional: preload existing employees so we can prevent duplicates
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(stored);
  }, []);

  const openUserModal = () => {
    setFormError("");
    setUserForm({
      id: newId(),
      name: "",
      email: "",
      department: "",
      role: "Staff",
    });
    setShowUserModal(true);
  };

  const closeUserModal = () => setShowUserModal(false);

  const handleUserSave = () => {
    const { id, name, email, department, role } = userForm;

    // basic validation
    if (!name.trim() || !email.trim() || !department) {
      setFormError("Please fill name, email and department.");
      return;
    }
    // very basic email check
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) {
      setFormError("Please enter a valid email address.");
      return;
    }
    // prevent duplicate email
    const duplicate = employees.some(e => e.email.toLowerCase() === email.toLowerCase());
    if (duplicate) {
      setFormError("An employee with this email already exists.");
      return;
    }

    const newEmp = { id, name, email, department, role };

    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    // nice UX: close and clear
    setShowUserModal(false);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Donut Tech</div>
        <nav>
          <button
            className={location.pathname === '/admin/dashboard' ? 'active' : ''}
            onClick={() => navigate('/admin/dashboard')}
          >
            <FaTasks /> Dashboard
          </button>
          <button
            className={location.pathname === '/admin/tasks' ? 'active' : ''}
            onClick={() => navigate('/admin/tasks')}
          >
            <FaTasks /> Tasks
          </button>
          <button
            className={location.pathname === '/admin/departments' ? 'active' : ''}
            onClick={() => navigate('/admin/departments')}
          >
            <FaBuilding /> Departments
          </button>

          {/* This opens the Create User modal */}
          <button className="new-user" onClick={openUserModal}>
            Create a new User
          </button>
        </nav>
        <div className="settings"><FaCog /> Settings</div>
      </aside>

      {/* Main routed area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ---- Create User Modal ---- */}
      {showUserModal && (
        <div className="modal-overlay" onClick={closeUserModal} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New User</h3>

            <label>Employee ID</label>
            <input
              type="text"
              value={userForm.id}
              onChange={(e) => setUserForm({ ...userForm, id: e.target.value })}
            />

            <label>Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />

            <label>Department</label>
            <select
              value={userForm.department}
              onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
            >
              <option value="">Select department</option>
              {DEPT_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <label>Role (optional)</label>
            <input
              type="text"
              placeholder="e.g., Senior Accountant"
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            />

            {formError && <div className="error">{formError}</div>}

            <div className="modal-actions">
              <button onClick={handleUserSave}>Save User</button>
              <button onClick={closeUserModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
