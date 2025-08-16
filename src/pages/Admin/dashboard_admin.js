import React, { useState, useEffect } from 'react';
import '../../Styles/dashboard_admin.css';
import {
  FaBell,
  FaPlus,
  FaCalendar,
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
} from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState([]);
const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

const [newTask, setNewTask] = useState({
  name: "",
  client: "",
  assignedTo: "",
  department: "",
  assignedDate: today,   // auto-fill with today's date
  deadline: "",
  status: "Pending",     // default
});

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save task
  const handleCreateTask = () => {
    const taskWithId = { ...newTask, id: Date.now() };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask({ name: "", assignedTo: "", department: "", deadline: "", status: "Pending" });
    setShowCreateModal(false);
  };

  // Stats
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const highPriorityTasks = tasks.filter((t) => t.status === "High Priority").length;
  const overdueTasks = tasks.filter(
    (t) => new Date(t.deadline) < new Date() && t.status !== "Completed"
  ).length;

  // Chart Data
  const taskData = [
    {
      name: "Tasks",
      Overdue: overdueTasks,
      Pending: pendingTasks,
      Completed: completedTasks,
      HighPriority: highPriorityTasks,
    },
  ];

  // Recent Tasks (last 5)
  const recentTasks = [...tasks].slice(-5).reverse();
// const fmt = (d) => {
//   const dt = new Date(d);
//   const y = dt.getFullYear();
//   const m = String(dt.getMonth() + 1).padStart(2, "0");
//   const day = String(dt.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`; // YYYY-MM-DD
// };

// after you load tasks from localStorage
// const deadlineSet = new Set(tasks
//   .filter(t => t.deadline)        // only tasks with a deadline
//   .map(t => fmt(t.deadline)));    // normalize to YYYY-MM-DD

// tasks for selected date
// const tasksForSelectedDate = tasks.filter(t => fmt(t.deadline) === fmt(selectedDate));

  return (
    <div className="dashboard-container">
      <main className="main-content">
        {/* ===== Top Bar ===== */}
        <div className="top-bar">
          <h2>Hello, Suhail 👋</h2>
          <div className="top-actions">
            <button className="create-task" onClick={() => setShowCreateModal(true)}>
              <FaPlus /> Create a Task
            </button>
            <FaCalendar
              className="icon"
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ cursor: "pointer" }}
            />
            <FaBell className="icon" />
            <img className="avatar" src="https://i.pravatar.cc/40" alt="User" />
          </div>
        </div>

        {/* ===== Calendar ===== */}
        {showCalendar && (
          <div className="calendar-popup">
            {/* <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              tileClassName={({ date, view }) => {
                if (view !== 'month') return null;               // only highlight days in month view
                const key = fmt(date);
                return deadlineSet.has(key) ? 'deadline-day' : null;
              }}
              tileContent={({ date, view }) => {
                if (view !== 'month') return null;
                const key = fmt(date);
                return deadlineSet.has(key) ? <span className="deadline-dot" /> : null;
              }}
            /> */}
            <Calendar
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  tileClassName={({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    if (tasks.some((t) => t.deadline === dateString)) {
      return "highlight-deadline";
    }
    return null;
  }}
/>

            <div className="calendar-details">
  <h3>Deadlines on {selectedDate.toDateString()}</h3>
  {tasks
    .filter((task) => task.deadline === selectedDate.toISOString().split("T")[0])
    .map((task, index) => (
      <div key={index} className="deadline-item">
        <strong>{task.name}</strong>
        <p>Client: {task.client}</p>
        <p>Assigned Date: {task.assignedDate}</p>
        <p>Due Date: {task.deadline}</p>
        <p>Department: {task.department}</p>
        <p>Assigned To: {task.assignedTo}</p>
        <p>Status: {task.status}</p>
      </div>
    ))}
</div>
          </div>
        )}

        {/* ===== Create Task Modal ===== */}
        {showCreateModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>Create New Task</h3>

      <label>Task:</label>
      <input
        type="text"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />

      <label>Client:</label>
      <input
        type="text"
        value={newTask.client}
        onChange={(e) => setNewTask({ ...newTask, client: e.target.value })}
      />

      <label>Assigned Date:</label>
      <input
        type="date"
        value={newTask.assignedDate}
        readOnly   // cannot edit, always today
      />

      <label>Due Date:</label>
      <input
        type="date"
        value={newTask.deadline}
        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
      />

      <label>Assign To (Employee):</label>
      <input
        type="text"
        value={newTask.assignedTo}
        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
      />

      <label>Department:</label>
      <select
        value={newTask.department}
        onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
      >
        <option value="">Select</option>
        <option value="GST">GST</option>
        <option value="Income Tax">Income Tax</option>
        <option value="ROC">ROC</option>
        <option value="Certifications">Certifications</option>
        <option value="Customer Details">Customer Details</option>
      </select>

      <label>Status:</label>
      <select
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="High Priority">High Priority</option>
      </select>

      <div className="modal-actions">
        <button onClick={handleCreateTask}>Create</button>
        <button onClick={() => setShowCreateModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}


        {/* ===== Stats Section ===== */}
        <section className="stats">
          <div className="stat-box stat-total">
            <div className="stat-icon">
              <FaTasks />
            </div>
            <div>Total Tasks <span>{totalTasks}</span></div>
          </div>
          <div className="stat-box stat-pending">
            <div className="stat-icon"><FaClock /></div>
            <div>Pending <span>{pendingTasks}</span></div>
          </div>
          <div className="stat-box stat-completed">
            <div className="stat-icon"><FaCheckCircle /></div>
            <div>Completed <span>{completedTasks}</span></div>
          </div>
          <div className="stat-box stat-priority">
            <div className="stat-icon"><FaExclamationTriangle /></div>
            <div>High Priority <span>{highPriorityTasks}</span></div>
          </div>
          <div className="stat-box stat-overdue">
            <div className="stat-icon"><FaExclamationTriangle /></div>
            <div>Overdue <span>{overdueTasks}</span></div>
          </div>
        </section>

        {/* ===== Chart ===== */}
        <section className="chart-section">
          <h3>Task Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskData}>
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

        {/* ===== Recent Tasks ===== */}
   <section className="recent-tasks">
  <h3>Recent Tasks</h3>
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Client</th>
        <th>Assigned Date</th>
        <th>Due Date</th>
        <th>Assigned To</th>
        <th>Department</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {recentTasks.length > 0 ? (
       recentTasks.map((task) => (
  <tr key={task.id}>
    <td>{task.name}</td>
    <td>{task.client}</td>
    <td>{task.assignedDate}</td>
    <td>{task.deadline}</td>
    <td>{task.assignedTo}</td>
    <td>
      <span className={`dept-badge ${task.department.toLowerCase().replace(/\s+/g, "-")}`}>
        {task.department}
      </span>
    </td>
    <td>
      <span
        className={`status-badge ${task.status
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        {task.status}
      </span>
    </td>
  </tr>
))
      ) : (
        <tr>
          <td colSpan="7">No tasks available</td>
        </tr>
      )}
    </tbody>
  </table>
</section>

        {/* ===== Activity Logs ===== */}
        <section className="activity-log">
          <h3>Activity Logs</h3>
          <ul>
            <li>Admin created {totalTasks} tasks</li>
            <li>{completedTasks} tasks completed</li>
            <li>{overdueTasks} tasks overdue</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
