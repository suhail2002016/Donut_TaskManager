// src/components/Layout.js
import React from 'react';
import { FaCog, FaTasks, FaBuilding } from 'react-icons/fa';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import '../Styles/dashboard_admin.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <button className={location.pathname === '/admin/departments' ? 'active' : ''}
            onClick={() => navigate('/admin/departments')}><FaBuilding /> Departments</button>
          <button className="new-user">Create a new User</button>
        </nav>
        <div className="settings"><FaCog /> Settings</div>
      </aside>

      {/* Here, children content is rendered */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
