// Dashboard.js (Admin Dashboard Page)
import React from 'react';
import '../Styles/dashboard_admin.css';
import { FaBell, FaPlus, FaCog, FaTasks, FaBuilding } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Donut Tech</div>
        <nav>
          <button className="active"><FaTasks /> Dashboard</button>
          <button><FaTasks /> Tasks</button>
          <button><FaBuilding /> Departments</button>
          <button className="new-user">Create a new User</button>
        </nav>
        <div className="settings"><FaCog /> Settings</div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h2>Hello, Suhail 👋</h2>
          <div className="top-actions">
            <button className="create-task"><FaPlus /> Create a Task</button>
            <FaBell className="icon" />
            <img className="avatar" src="https://i.pravatar.cc/40" alt="User" />
          </div>
        </div>

        <section className="stats">
          <div className="stat-box">Total Tasks <span>400</span></div>
          <div className="stat-box">Pending Tasks <span>100</span></div>
          <div className="stat-box">Completed Tasks <span>300</span></div>
          <div className="stat-box">High Priority Tasks <span>20</span></div>
          <div className="stat-box">Overdue Tasks <span>20</span></div>
        </section>

        <section className="chart-section">
          <h3>Task Overview</h3>
          <img src="https://via.placeholder.com/500x200?text=Chart+Placeholder" alt="chart" />
        </section>

        <section className="recent-tasks">
          <h3>Recent Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Fix Login Bug</td><td>John</td><td>Pending</td><td>Aug 10</td></tr>
              <tr><td>Redesign UI</td><td>Alice</td><td>Completed</td><td>Aug 6</td></tr>
              <tr><td>Test API</td><td>Mark</td><td>Pending</td><td>Aug 12</td></tr>
            </tbody>
          </table>
        </section>

        <section className="activity-log">
          <h3>Activity Logs</h3>
          <ul>
            <li>User Alice created a task</li>
            <li>Admin updated department list</li>
            <li>User John completed "Fix Login Bug"</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
