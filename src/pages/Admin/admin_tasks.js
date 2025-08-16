import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaTasks,
  // FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "../../Styles/admin_tasks.css";

const departmentColors = {
  GST: "#FF6600",
  "Income Tax": "#0027FF",
  ROC: "#FF0057",
  Certifications: "#8E44AD",
  "Customer Details": "#16A085",
};

const statusColors = {
  Pending: "#3498db",
  "In Progress": "#f1c40f",
  Completed: "#2ecc71",
  "High Priority": "#e74c3c",
};

// helpers
const toSlug = (s = "") => s.toLowerCase().replace(/\s+/g, "-"); // "Income Tax" -> "income-tax"
const statusSlug = (s = "") => s.toLowerCase().replace(/\s+/g, "-"); // "High Priority" -> "high-priority"



const mockTasks = [
  {
    id: 1,
    name: "Fix Login Bug",
    from: "Client A",
    assignedTo: "John",
    assignedDate: "2025-08-08",
    givenDate: "2025-08-07",
    due: "2025-08-10",
    status: "Pending",
    department: "Income Tax",
  },
  {
    id: 2,
    name: "Redesign UI",
    from: "Client B",
    assignedTo: "Alice",
    assignedDate: "2025-08-05",
    givenDate: "2025-08-04",
    due: "2025-08-06",
    status: "Completed",
    department: "GST",
  },
  {
    id: 3,
    name: "Test API",
    from: "Client C",
    assignedTo: "Mark",
    assignedDate: "2025-08-10",
    givenDate: "2025-08-09",
    due: "2025-08-12",
    status: "High Priority",
    department: "ROC",
  },
];

const AdminTasks = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || mockTasks
  );
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

    // keep localStorage in sync whenever tasks update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const filteredTasks = tasks.filter((task) => {
    return (
      (filterStatus ? task.status === filterStatus : true) &&
      (filterDepartment ? task.department === filterDepartment : true)
    );
  });

const normalizedTasks = filteredTasks.map(t => ({
  id: t.id,
  name: t.name,
  client: t.client ?? t.from ?? "",
  assignedDate: t.assignedDate ?? "",
  deadline: t.deadline ?? t.due ?? "",
  assignedTo: t.assignedTo ?? "",
  department: t.department ?? "",
  status: t.status ?? "Pending"
}));


  const departmentStats = Object.keys(departmentColors).map((dept) => ({
    name: dept,
    count: tasks.filter((t) => t.department === dept).length,
    color: departmentColors[dept],
  }));

  const handleSave = () => {
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
  };

  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== deletingTask.id));
    setDeletingTask(null);
  };

  return (
    <div className="tasks-section">
      {/* 🔹 Department Overview */}
      <div className="department-overview">
        {departmentStats.map((dept) => (
          <div
            key={dept.name}
            className="dept-card glass-card"
            style={{ borderTop: `5px solid ${dept.color}` }}
            onClick={() =>
              setFilterDepartment(filterDepartment === dept.name ? "" : dept.name)
            }
          >
            <FaUsers size={24} />
            <h4>{dept.name}</h4>
            <p>{dept.count} Tasks</p>
          </div>
        ))}
      </div>

      {/* 🔹 Filters */}
      <div className="tasks-header">
        <div className="title">
          <h2><FaTasks /> Task Management</h2>
        <p>Track tasks, monitor deadlines, and manage staff assignments with ease.</p>
        </div>
        
        <div className="filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {Object.keys(departmentColors).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Task Table */}
<table className="tasks-table">
  <thead>
    <tr>
      <th>Task</th>
      <th>Client</th>
      <th>Assigned Date</th>
      <th>Due Date</th>
      <th>Assigned To</th>
      <th>Department</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {normalizedTasks.map((task) => (
      <tr key={task.id}>
        <td>{task.name}</td>
        <td className="col-muted">{task.client}</td>
        <td className="col-muted">{task.assignedDate}</td>
        <td>{task.deadline}</td>
        <td>{task.assignedTo}</td>

        {/* Department badge just like Recent Tasks */}
        <td>
          <span className={`dept-badge ${toSlug(task.department)}`}>
            {task.department}
          </span>
        </td>

        {/* Status badge just like Recent Tasks */}
        <td>
          <span className={`status-badge ${statusSlug(task.status)}`}>
            {task.status}
          </span>
        </td>

        <td>
          <button className="icon-btn edit-btn" onClick={() => setEditingTask(task)}>
            <FaEdit />
          </button>
          <button className="icon-btn delete-btn" onClick={() => setDeletingTask(task)}>
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* 🔹 Edit Modal */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <h3>Edit Task</h3>
            <label>Assigned To:</label>
            <input
              value={editingTask.assignedTo}
              onChange={(e) =>
                setEditingTask({ ...editingTask, assignedTo: e.target.value })
              }
            />

            <label>Department:</label>
            <select
              value={editingTask.department}
              onChange={(e) =>
                setEditingTask({ ...editingTask, department: e.target.value })
              }
            >
              {Object.keys(departmentColors).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <label>Status:</label>
            <select
              value={editingTask.status}
              onChange={(e) =>
                setEditingTask({ ...editingTask, status: e.target.value })
              }
            >
              {Object.keys(statusColors).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <label>Due Date:</label>
            <input
              type="date"
              value={editingTask.due}
              onChange={(e) =>
                setEditingTask({ ...editingTask, due: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Delete Confirmation */}
      {deletingTask && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <h3><FaExclamationCircle color="red" /> Confirm Delete</h3>
            <p>Are you sure you want to delete "{deletingTask.name}"?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button onClick={() => setDeletingTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
