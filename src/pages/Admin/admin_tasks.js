import React, { useState } from 'react';
import '../../Styles/admin_tasks.css';

const departmentColors = {
  GST: '#FF6600',
  'Income Tax': '#0027FF',
  ROC: '#FF0057',
  Certifications: '#8E44AD',
  'Customer Details': '#16A085',
};

const statusColors = {
  Pending: '#3498db',
  'In Progress': '#f1c40f',
  Completed: '#2ecc71',
  'High Priority': '#e74c3c',
};

const mockTasks = [
  {
    id: 1,
    name: 'Fix Login Bug',
    from: 'Client A',
    assignedTo: 'John',
    due: 'Aug 10',
    status: 'Pending',
    department: 'Income Tax',
  },
  {
    id: 2,
    name: 'Redesign UI',
    from: 'Client B',
    assignedTo: 'Alice',
    due: 'Aug 6',
    status: 'Completed',
    department: 'GST',
  },
  {
    id: 3,
    name: 'Test API',
    from: 'Client C',
    assignedTo: 'Mark',
    due: 'Aug 12',
    status: 'High Priority',
    department: 'ROC',
  },
];

const AdminTasks = () => {
  const [tasks] = useState(mockTasks);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const filteredTasks = tasks.filter(task => {
    return (
      (filterStatus ? task.status === filterStatus : true) &&
      (filterDepartment ? task.department === filterDepartment : true)
    );
  });

  return (
    <div className="tasks-section">
      <div className="tasks-header">
        <h2>All Tasks</h2>
        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {Object.keys(departmentColors).map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>From</th>
            <th>Assigned To</th>
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
              <td>{task.assignedTo}</td>
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
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTasks;
