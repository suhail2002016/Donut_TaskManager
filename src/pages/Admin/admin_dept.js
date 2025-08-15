import React, { useState } from "react";
import "../../Styles/admin_departments.css";

const departmentData = [
  {
    name: "GST",
    color: "#FF6600",
    staff: [
      {
        name: "John",
        tasks: [
          {
            title: "GST Filing Q1",
            department: "GST",
            givenDate: "2025-08-01",
            assignedDate: "2025-08-02",
            deadline: "2025-08-10",
            status: "Pending"
          },
          {
            title: "GST Audit",
            department: "GST",
            givenDate: "2025-07-15",
            assignedDate: "2025-07-16",
            deadline: "2025-07-25",
            status: "Completed"
          }
        ]
      },
      {
        name: "Mary",
        tasks: [
          {
            title: "GST Form Correction",
            department: "GST",
            givenDate: "2025-08-03",
            assignedDate: "2025-08-04",
            deadline: "2025-08-12",
            status: "High Priority"
          }
        ]
      }
    ]
  },
  {
    name: "Income Tax",
    color: "#0027FF",
    staff: [
      {
        name: "Alice",
        tasks: [
          {
            title: "ITR Filing",
            department: "Income Tax",
            givenDate: "2025-08-05",
            assignedDate: "2025-08-06",
            deadline: "2025-08-15",
            status: "Pending"
          }
        ]
      }
    ]
  }
];

export default function Departments() {
  const [expandedDept, setExpandedDept] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleExpand = (name) => {
    setExpandedDept(expandedDept === name ? null : name);
  };

  const openStaffModal = (staff) => {
    setSelectedStaff(staff);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStaff(null);
  };

  return (
    <div className="departments-page">
      <h2>Department Management</h2>
      <div className="department-list">
        {departmentData.map((dept) => {
          const totalTasks = dept.staff.reduce(
            (sum, staff) => sum + staff.tasks.length,
            0
          );
          return (
            <div
              key={dept.name}
              className="department-card"
              style={{ borderTopColor: dept.color }}
              onClick={() => toggleExpand(dept.name)}
            >
              <div className="dept-summary">
                <h3>{dept.name}</h3>
                <p>{dept.staff.length} Staff</p>
                <p>{totalTasks} Tasks</p>
              </div>

              {expandedDept === dept.name && (
                <div className="dept-details">
                  {dept.staff.map((staff, idx) => (
                    <div
                      key={idx}
                      className="staff-info clickable"
                      onClick={(e) => {
                        e.stopPropagation();
                        openStaffModal(staff);
                      }}
                    >
                      <strong>{staff.name}</strong>
                      <p>{staff.tasks.length} Tasks</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Staff Task Modal */}
      {modalOpen && selectedStaff && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedStaff.name} - Task Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Department</th>
                  <th>Given Date</th>
                  <th>Assigned Date</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedStaff.tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.department}</td>
                    <td>{task.givenDate}</td>
                    <td>{task.assignedDate}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}