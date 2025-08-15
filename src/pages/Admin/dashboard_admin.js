// Dashboard.js (Admin Dashboard Page)
import React, { useState } from 'react';
import '../../Styles/dashboard_admin.css';
import { FaBell, FaPlus, FaCalendar } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock deadlines (replace with API later)
const deadlines = [
  { date: '2025-08-20', task: 'Submit GST Report', department: 'GST', assignedTo: 'John' },
  { date: '2025-08-22', task: 'File Income Tax', department: 'Income Tax', assignedTo: 'Alice' },
  { date: '2025-08-25', task: 'ROC Compliance', department: 'ROC', assignedTo: 'Mark' },
];

const taskData = [
  { name: 'Tasks', Overdue: 2, Pending: 77, Completed: 300, HighPriority: 41 },
];

const Dashboard = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter deadlines for the selected date
  const tasksForSelectedDate = deadlines.filter(
    (d) => d.date === selectedDate.toISOString().split('T')[0]
  );

    // Extract just the dates for highlighting
  const deadlineDates = deadlines.map((d) => d.date);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="top-bar">
          <h2>Hello, Suhail 👋</h2>
          <div className="top-actions">
            <button className="create-task">
              <FaPlus /> Create a Task
            </button>

            <FaCalendar
              className="icon"
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ cursor: 'pointer' }}
            />

            <FaBell className="icon" />
            <img className="avatar" src="https://i.pravatar.cc/40" alt="User" />
          </div>
        </div>

     {/* Calendar Popup */}
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              tileClassName={({ date }) => {
                const dateString = date.toISOString().split('T')[0];
                if (deadlineDates.includes(dateString)) {
                  return 'highlight-deadline';
                }
                return null;
              }}
            />

            <div className="calendar-details">
              <h3>Deadlines on {selectedDate.toDateString()}</h3>
              {tasksForSelectedDate.length > 0 ? (
                tasksForSelectedDate.map((task, index) => (
                  <div key={index} className="deadline-item">
                    <strong>{task.task}</strong>
                    <p>Department: {task.department}</p>
                    <p>Assigned To: {task.assignedTo}</p>
                  </div>
                ))
              ) : (
                <p>No deadlines for this date.</p>
              )}
            </div>
          </div>
        )}

        {/* Existing Stats */}
        <section className="stats">
          <div className="stat-box">Total Tasks <span>400</span></div>
          <div className="stat-box">Pending Tasks <span>77</span></div>
          <div className="stat-box">Completed Tasks <span>323</span></div>
          <div className="stat-box">High Priority Tasks <span>41</span></div>
          <div className="stat-box">Overdue Tasks <span>2</span></div>
        </section>

        {/* Chart */}
        <section className="chart-section">
          <h3>Task Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Overdue" fill="#3498db" />
              <Bar dataKey="Pending" fill="#f1c40f" />
              <Bar dataKey="Completed" fill="#2ecc71" />
              <Bar dataKey="HighPriority" fill="#e74c3c" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="recent-tasks">
          <h3>Recent Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>From</th>
                <th>Assigned To</th>
                <th>Department</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fix Login Bug</td>
                <td>Client A</td>
                <td>John</td>
                <td>
                  <span className="dept-tag gst">GST</span>
                </td>
                <td>Aug 10</td>
                <td>
                  <span className="status-tag pending">Overdue</span>
                </td>
              </tr>
              <tr>
                <td>Redesign UI</td>
                <td>Client B</td>
                <td>Alice</td>
                <td>
                  <span className="dept-tag roc">ROC</span></td>
                <td>Aug 6</td>
                <td>
                  <span className="status-tag completed">Completed</span>
                </td> </tr> <tr> <td>Test API</td> <td>Client C</td>
                <td>Mark</td>
                <td><span className="dept-tag income-tax">Income Tax</span></td>
                <td>Aug 12</td>
                <td>
                  <span className="status-tag inprogress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="activity-log">
          <h3>Activity Logs</h3>
          <ul>
            <li>Admin Alice created a task</li>
            <li>Admin updated department list</li>
            <li>User John completed "Fix Login Bug"</li>
          </ul>
        </section>
        <section className="departments"> <h3>Department Overview</h3>
          <div className="stats"> <div className="stat-box" style={{ borderTopColor: '#FF6600' }}> GST <span>23</span>
          </div> <div className="stat-box" style={{ borderTopColor: '#0027FF' }}> Income Tax <span>18</span>
            </div> <div className="stat-box" style={{ borderTopColor: '#FF0057' }}> ROC <span>12</span>
            </div> <div className="stat-box" style={{ borderTopColor: '#8E44AD' }}> Certifications <span>9</span> </div>
            <div className="stat-box" style={{ borderTopColor: '#16A085' }}> Customer Details <span>15</span>
            </div>
          </div>
        </section>
      </main>
    </div>);
}; export default Dashboard;

