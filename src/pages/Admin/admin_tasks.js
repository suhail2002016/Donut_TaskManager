// export default AdminTasks;
import React, { useState } from "react";
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

const mockTasks = [
  {
    id: 1,
    name: "Fix Login Bug",
    from: "Client A",
    assignedTo: "John",
    assignedDate: "Aug 8",
    givenDate: "Aug 7",
    due: "Aug 10",
    status: "Pending",
    department: "Income Tax",
  },
  {
    id: 2,
    name: "Redesign UI",
    from: "Client B",
    assignedTo: "Alice",
    assignedDate: "Aug 5",
    givenDate: "Aug 4",
    due: "Aug 6",
    status: "Completed",
    department: "GST",
  },
  {
    id: 3,
    name: "Test API",
    from: "Client C",
    assignedTo: "Mark",
    assignedDate: "Aug 10",
    givenDate: "Aug 9",
    due: "Aug 12",
    status: "High Priority",
    department: "ROC",
  },
    {
    id: 4,
    name: "Update our Details",
    from: "Client D",
    assignedTo: "Suhail",
    assignedDate: "Aug 10",
    givenDate: "Aug 9",
    due: "Aug 12",
    status: "High Priority",
    department: "Customer Details",
  },
];

const AdminTasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterStatus ? task.status === filterStatus : true) &&
      (filterDepartment ? task.department === filterDepartment : true)
    );
  });

  const handleSave = () => {
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
  };

    const departmentStats = Object.keys(departmentColors).map((dept) => ({
    name: dept,
    count: tasks.filter((t) => t.department === dept).length,
    color: departmentColors[dept],
  }));

  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== deletingTask.id));
    setDeletingTask(null);
  };

  return (
        
      
    <div className="tasks-section">
      {/* Department Overview */}
      <div className="department-overview">
        {departmentStats.map((dept) => (
          <div
            key={dept.name}
            className="dept-card"
            style={{ backgroundColor: dept.color }}
            onClick={() =>
              setFilterDepartment(filterDepartment === dept.name ? '' : dept.name)
            }
          >
            <h4>{dept.name}</h4>
            <p>{dept.count} Tasks</p>
          </div>
        ))}
      </div>
      <div className="tasks-header">
        <h2>All Tasks</h2>
        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {Object.keys(departmentColors).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>From</th>
            <th>Given Date</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Status</th>
            <th>Department</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.from}</td>
              <td>{task.givenDate}</td>
              <td>{task.assignedTo}</td>
              <td>{task.assignedDate}</td>
              <td>
                <span className="status-tag" style={{ backgroundColor: statusColors[task.status] }}>
                  {task.status}
                </span>
              </td>
              <td>
                <span className="dept-tag" style={{ backgroundColor: departmentColors[task.department] }}>
                  {task.department}
                </span>
              </td>
              <td>{task.due}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditingTask(task)}>Edit</button>
                <button className="delete-btn" onClick={() => setDeletingTask(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <label>Assigned To:</label>
            <input
              value={editingTask.assignedTo}
              onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
            />

            <label>Department:</label>
            <select
              value={editingTask.department}
              onChange={(e) => setEditingTask({ ...editingTask, department: e.target.value })}
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
              onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
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
              onChange={(e) => setEditingTask({ ...editingTask, due: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deletingTask.name}"?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setDeletingTask(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
