// import React, { useMemo, useState } from "react";
// import "../../Styles/admin_departments.css";
// import { FaUsers, FaTasks, FaSearch, FaFilter } from "react-icons/fa";

// // ---- Color tokens (match your brand) ----
// const DEPT_COLORS = {
//   GST: "#FF6600",
//   "Income Tax": "#0027FF",
//   ROC: "#FF0057",
//   Certifications: "#8E44AD",
//   "Customer Details": "#16A085",
// };

// const STATUS_COLORS = {
// //   Pending: "#3498db",
//   "In Progress": "#f1c40f",
//   Completed: "#2ecc71",
//   Overdue: "#3498db",
//   "High Priority": "#e74c3c",
// };

// // ---- Example data (swap for API data later) ----
// const departmentData = [
//   {
//     id: "D001",
//     name: "GST",
//     staff: [
//       {
//         id: "E101",
//         name: "John Mathews",
//         role: "Senior Accountant",
//         email: "john@gst.com",
//         tasks: [
//           { title: "GST Filing Q1", status: "High Priority", deadline: "2025-08-10", client: "Client A" },
//           { title: "GST Audit", status: "Completed", deadline: "2025-07-25", client: "Client B" },
//           { title: "Reconcile GST Input", status: "In Progress", deadline: "2025-08-19", client: "Client C" },
//         ],
//       },
//       {
//         id: "E102",
//         name: "Mary Francis",
//         role: "Tax Consultant",
//         email: "mary@gst.com",
//         tasks: [
//           { title: "GST Form Correction", status: "High Priority", deadline: "2025-08-12", client: "Client D" },
//           { title: "GSTR-3B Filing", status: "Overdue", deadline: "2025-08-14", client: "Client E" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "D002",
//     name: "Income Tax",
//     staff: [
//       {
//         id: "E201",
//         name: "Alice Green",
//         role: "Tax Analyst",
//         email: "alice@itax.com",
//         tasks: [
//           { title: "ITR Filing – Individual", status: "Hign Priority", deadline: "2025-08-15", client: "Client X" },
//           { title: "TDS Return", status: "In Progress", deadline: "2025-08-20", client: "Client Y" },
//         ],
//       },
//       {
//         id: "E202",
//         name: "Robert Hill",
//         role: "Account Associate",
//         email: "rob@itax.com",
//         tasks: [
//           { title: "IT Notice Response", status: "Overdue", deadline: "2025-08-08", client: "Client Z" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "D003",
//     name: "ROC",
//     staff: [
//       {
//         id: "E301",
//         name: "Mark Peters",
//         role: "Compliance Lead",
//         email: "mark@roc.com",
//         tasks: [
//           { title: "ROC Annual Return", status: "In Progress", deadline: "2025-08-25", client: "Client K" },
//           { title: "Director KYC", status: "Completed", deadline: "2025-07-30", client: "Client L" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "D004",
//     name: "Certifications",
//     staff: [
//       {
//         id: "E401",
//         name: "Sophie Jain",
//         role: "Cert Ops",
//         email: "sophie@certs.com",
//         tasks: [
//           { title: "FSSAI License Renewal", status: "In Progress", deadline: "2025-08-22", client: "Client Q" },
//           { title: "IEC Registration", status: "Completed", deadline: "2025-08-01", client: "Client R" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "D005",
//     name: "Customer Details",
//     staff: [
//       {
//         id: "E501",
//         name: "James Carter",
//         role: "Client Ops",
//         email: "james@cust.com",
//         tasks: [
//           { title: "KYC Update – Client S", status: "In Progress", deadline: "2025-08-16", client: "Client S" },
//           { title: "Master Data Cleanup", status: "Completed", deadline: "2025-08-02", client: "Internal" },
//         ],
//       },
//     ],
//   },
// ];

// // ---- Helpers ----
// const getCounts = (tasks) => ({
//   total: tasks.length,
// //   pending: tasks.filter((t) => t.status === "Pending").length,
//   inProgress: tasks.filter((t) => t.status === "In Progress").length,
//   completed: tasks.filter((t) => t.status === "Completed").length,
//   overdue: tasks.filter((t) => t.status === "Overdue").length,
//   highPriority: tasks.filter((t) => t.status === "High Priority").length,
// });

// const initials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function Departments() {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [deptFilter, setDeptFilter] = useState("");
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   // derived flat list of departments with color
//   const departments = useMemo(
//     () =>
//       departmentData.map((d) => ({
//         ...d,
//         color: DEPT_COLORS[d.name] || "#222",
//       })),
//     []
//   );

//   const allDeptNames = Object.keys(DEPT_COLORS);

//   // filter function for employees
//   const matchEmployee = (emp) => {
//     if (!search.trim()) return true;
//     const term = search.toLowerCase();
//     return (
//       emp.name.toLowerCase().includes(term) ||
//       emp.id.toLowerCase().includes(term) ||
//       emp.email.toLowerCase().includes(term)
//     );
//   };

//   // optional status filter checks if employee has at least one task with that status
//   const employeeHasStatus = (emp) =>
//     !statusFilter ||
//     emp.tasks.some((t) => t.status.toLowerCase() === statusFilter.toLowerCase());

//   // optional department filter (by department name)
//   const matchDepartment = (deptName) => !deptFilter || deptFilter === deptName;

//   return (
//     <div className="dept-page">
//       {/* Header */}
//       <div className="dept-header">
//         <div className="title">
//           <h2>Departments</h2>
//           <p>Everything at a glance — staff, workload, and progress.</p>
//         </div>
//         <div className="controls">
//           <div className="search">
//             <FaSearch />
//             <input
//               placeholder="Search by employee name, email, or ID…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="filters">
//             <FaFilter />
//             <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
//               <option value="">All Departments</option>
//               {allDeptNames.map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>

//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//               <option value="">All Statuses</option>
//               {Object.keys(STATUS_COLORS).map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="dept-cards">
//         {departments
//           .filter((d) => matchDepartment(d.name))
//           .map((dept) => {
//             const totals = dept.staff.reduce(
//               (acc, s) => {
//                 const c = getCounts(s.tasks);
//                 acc.total += c.total;
//                 acc.completed += c.completed;
//                 return acc;
//               },
//               { total: 0, completed: 0 }
//             );
//             const pct = totals.total ? Math.round((totals.completed / totals.total) * 100) : 0;

//             return (
//               <div className="dept-card" key={dept.id} style={{ borderTopColor: dept.color }}>
//                 <div className="dept-card-top">
//                   <div className="dept-chip" style={{ background: dept.color }} />
//                   <h3>{dept.name}</h3>
//                 </div>
//                 <div className="dept-card-stats">
//                   <div className="mini">
//                     <FaUsers /> <span>{dept.staff.length}</span>
//                     <small>Employees</small>
//                   </div>
//                   <div className="mini">
//                     <FaTasks /> <span>{totals.total}</span>
//                     <small>Total Tasks</small>
//                   </div>
//                 </div>
//                 <div className="progress">
//                   <div className="bar">
//                     <div className="fill" style={{ width: `${pct}%`, background: dept.color }} />
//                   </div>
//                   <small>{pct}% Completed</small>
//                 </div>
//               </div>
//             );
//           })}
//       </div>

//       {/* Staff Lists */}
//       {departments
//         .filter((d) => matchDepartment(d.name))
//         .map((dept) => {
//           const filteredStaff = dept.staff.filter(
//             (emp) => matchEmployee(emp) && employeeHasStatus(emp)
//           );

//           return (
//             <div className="dept-section" key={dept.id}>
//               <div className="dept-section-head">
//                 <h3>
//                   <span className="dot" style={{ background: dept.color }} />
//                   {dept.name} — <b>{filteredStaff.length}</b> employees shown
//                 </h3>
//               </div>

//               <div className="staff-card">
//                 <div className="staff-table-wrapper">
//                   <table className="staff-table">
//                     <thead>
//                       <tr>
//                         <th>Employee</th>
//                         <th>Role</th>
//                         <th>Email</th>
//                         <th>Total</th>
//                         {/* <th>Pending</th> */}
//                         <th>In Prog.</th>
//                         <th>Completed</th>
//                         <th>Overdue</th>
//                         <th>High Pri.</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredStaff.length === 0 ? (
//                         <tr>
//                           <td colSpan={9} className="empty">
//                             No employees match your search/filters.
//                           </td>
//                         </tr>
//                       ) : (
//                         filteredStaff.map((emp) => {
//                           const c = getCounts(emp.tasks);
//                           return (
//                             <tr
//                               key={emp.id}
//                               onClick={() => setSelectedStaff({ ...emp, department: dept.name })}
//                             >
//                               <td>
//                                 <div className="emp-cell">
//                                   <div
//                                     className="avatar"
//                                     style={{ background: dept.color }}
//                                     aria-hidden
//                                   >
//                                     {initials(emp.name)}
//                                   </div>
//                                   <div>
//                                     <div className="emp-name">
//                                       {emp.name} <span className="emp-id">({emp.id})</span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td>{emp.role}</td>
//                               <td className="muted">{emp.email}</td>
//                               <td>{c.total}</td>
//                               {/* <td>
//                                 <span className="pill" style={{ background: STATUS_COLORS["Pending"] }}>
//                                   {c.pending}
//                                 </span>
//                               </td> */}
//                               <td>
//                                 <span className="pill" style={{ background: STATUS_COLORS["In Progress"] }}>
//                                   {c.inProgress}
//                                 </span>
//                               </td>
//                               <td>
//                                 <span className="pill" style={{ background: STATUS_COLORS["Completed"] }}>
//                                   {c.completed}
//                                 </span>
//                               </td>
//                               <td>
//                                 <span className="pill" style={{ background: STATUS_COLORS["Overdue"] }}>
//                                   {c.overdue}
//                                 </span>
//                               </td>
//                               <td>
//                                 <span className="pill" style={{ background: STATUS_COLORS["High Priority"] }}>
//                                   {c.highPriority}
//                                 </span>
//                               </td>
//                             </tr>
//                           );
//                         })
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//       {/* Staff detail modal */}
//       {selectedStaff && (
//         <div className="modal-overlay" onClick={() => setSelectedStaff(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>
//               {selectedStaff.name} <span className="emp-id">({selectedStaff.id})</span>
//             </h3>
//             <p className="muted">
//               {selectedStaff.role} — {selectedStaff.email} — Dept: {selectedStaff.department}
//             </p>
//             <div className="task-detail-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Task</th>
//                     <th>Client</th>
//                     <th>Status</th>
//                     <th>Deadline</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedStaff.tasks.map((t, i) => (
//                     <tr key={i}>
//                       <td>{t.title}</td>
//                       <td className="muted">{t.client}</td>
//                       <td>
//                         <span className="pill" style={{ background: STATUS_COLORS[t.status] }}>
//                           {t.status}
//                         </span>
//                       </td>
//                       <td>{t.deadline}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="modal-actions">
//               <button className="btn" onClick={() => setSelectedStaff(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import "../../Styles/admin_departments.css";
import { FaUsers, FaTasks, FaSearch, FaFilter } from "react-icons/fa";

/* ---- Brand colors ---- */
const DEPT_COLORS = {
  GST: "#FF6600",
  "Income Tax": "#0027FF",
  ROC: "#FF0057",
  Certifications: "#8E44AD",
  "Customer Details": "#16A085",
};

const STATUS_COLORS = {
  Pending: "#3498db",        // blue
  "In Progress": "#f1c40f",  // yellow
  Completed: "#2ecc71",      // green
  Overdue: "#e74c3c",        // red
  "High Priority": "#e74c3c" // red
};

/* ---- Default employee seed (can be replaced by your API) ---- */
const defaultEmployees = [
  { id: "E101", name: "John Mathews", role: "Senior Accountant", email: "john@gst.com", department: "GST" },
  { id: "E102", name: "Mary Francis", role: "Tax Consultant",   email: "mary@gst.com", department: "GST" },
  { id: "E201", name: "Alice Green",   role: "Tax Analyst",      email: "alice@itax.com", department: "Income Tax" },
  { id: "E202", name: "Robert Hill",   role: "Account Associate",email: "rob@itax.com",   department: "Income Tax" },
  { id: "E301", name: "Mark Peters",   role: "Compliance Lead",  email: "mark@roc.com",   department: "ROC" },
  { id: "E401", name: "Sophie Jain",   role: "Cert Ops",         email: "sophie@certs.com", department: "Certifications" },
  { id: "E501", name: "James Carter",  role: "Client Ops",       email: "james@cust.com", department: "Customer Details" },
];

/* ---- Helpers ---- */
const normalizeStatus = (s = "") => {
  const x = s.trim().toLowerCase();
  if (x === "hign priority") return "High Priority";
  if (x === "high priority") return "High Priority";
  if (x === "in progress")   return "In Progress";
  if (x === "pending")       return "Pending";
  if (x === "completed")     return "Completed";
  if (x === "overdue")       return "Overdue";
  return s || "Pending";
};

const getCounts = (tasks) => ({
  total: tasks.length,
  pending: tasks.filter((t) => normalizeStatus(t.status) === "Pending").length,
  inProgress: tasks.filter((t) => normalizeStatus(t.status) === "In Progress").length,
  completed: tasks.filter((t) => normalizeStatus(t.status) === "Completed").length,
  overdue: tasks.filter((t) => normalizeStatus(t.status) === "Overdue").length,
  highPriority: tasks.filter((t) => normalizeStatus(t.status) === "High Priority").length,
});

const initials = (name = "") =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

export default function Departments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Load tasks and employees from localStorage (or seed)
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || defaultEmployees;
    setEmployees(storedEmployees);
    // If first time, persist seed so you can later edit from UI
    if (!localStorage.getItem("employees")) {
      localStorage.setItem("employees", JSON.stringify(defaultEmployees));
    }
  }, []);

  const allDeptNames = Object.keys(DEPT_COLORS);

  // Build departments dynamically by joining employees with their tasks
  const departments = useMemo(() => {
    // group employees by department
    const map = new Map();
    for (const emp of employees) {
      const empTasks = tasks.filter(
        (t) => (t.assignedTo || "").toLowerCase() === emp.name.toLowerCase()
      );
      const richEmp = { ...emp, tasks: empTasks.map((t) => ({ ...t, status: normalizeStatus(t.status) })) };

      if (!map.has(emp.department)) {
        map.set(emp.department, {
          id: `D-${emp.department}`,
          name: emp.department,
          color: DEPT_COLORS[emp.department] || "#222",
          staff: [],
        });
      }
      map.get(emp.department).staff.push(richEmp);
    }

    // also include departments that exist in DEPT_COLORS but have no employees yet
    for (const deptName of allDeptNames) {
      if (!map.has(deptName)) {
        map.set(deptName, { id: `D-${deptName}`, name: deptName, color: DEPT_COLORS[deptName], staff: [] });
      }
    }

    // return in a consistent order based on DEPT_COLORS keys
    return allDeptNames.map((name) => map.get(name));
  }, [employees, tasks]);

  // Filters
  const matchEmployee = (emp) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      emp.name.toLowerCase().includes(term) ||
      emp.id.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );
  };

  const employeeHasStatus = (emp) =>
    !statusFilter ||
    emp.tasks.some((t) => normalizeStatus(t.status).toLowerCase() === statusFilter.toLowerCase());

  const matchDepartment = (deptName) => !deptFilter || deptFilter === deptName;

  return (
    <div className="dept-page">
      {/* Header */}
      <div className="dept-header">
        <div className="title">
          <h2>Departments</h2>
          <p>Everything at a glance — staff, workload, and progress.</p>
        </div>
        <div className="controls">
          <div className="search">
            <FaSearch />
            <input
              placeholder="Search by employee name, email, or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            <FaFilter />
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="">All Departments</option>
              {allDeptNames.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              {Object.keys(STATUS_COLORS).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dept-cards">
        {departments
          .filter((d) => matchDepartment(d.name))
          .map((dept) => {
            // aggregate totals from employees
            const totals = dept.staff.reduce(
              (acc, s) => {
                const c = getCounts(s.tasks);
                acc.total += c.total;
                acc.completed += c.completed;
                return acc;
              },
              { total: 0, completed: 0 }
            );
            const pct = totals.total ? Math.round((totals.completed / totals.total) * 100) : 0;

            return (
              <div className="dept-card" key={dept.id} style={{ borderTopColor: dept.color }}>
                <div className="dept-card-top">
                  <div className="dept-chip" style={{ background: dept.color }} />
                  <h3>{dept.name}</h3>
                </div>
                <div className="dept-card-stats">
                  <div className="mini">
                    <FaUsers /> <span>{dept.staff.length}</span>
                    <small>Employees</small>
                  </div>
                  <div className="mini">
                    <FaTasks /> <span>{totals.total}</span>
                    <small>Total Tasks</small>
                  </div>
                </div>
                <div className="progress">
                  <div className="bar">
                    <div className="fill" style={{ width: `${pct}%`, background: dept.color }} />
                  </div>
                  <small>{pct}% Completed</small>
                </div>
              </div>
            );
          })}
      </div>

      {/* Staff Lists */}
      {departments
        .filter((d) => matchDepartment(d.name))
        .map((dept) => {
          const filteredStaff = dept.staff.filter((emp) => matchEmployee(emp) && employeeHasStatus(emp));

          return (
            <div className="dept-section" key={dept.id}>
              <div className="dept-section-head">
                <h3>
                  <span className="dot" style={{ background: dept.color }} />
                  {dept.name} — <b>{filteredStaff.length}</b> employees shown
                </h3>
              </div>

              <div className="staff-card">
                <div className="staff-table-wrapper">
                  <table className="staff-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Total</th>
                        {/* <th>Pending</th> */}
                        <th>In Prog.</th>
                        <th>Completed</th>
                        <th>Overdue</th>
                        <th>High Pri.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="empty">No employees match your search/filters.</td>
                        </tr>
                      ) : (
                        filteredStaff.map((emp) => {
                          const c = getCounts(emp.tasks);
                          return (
                            <tr key={emp.id} onClick={() => setSelectedStaff({ ...emp, department: dept.name })}>
                              <td>
                                <div className="emp-cell">
                                  <div className="avatar" style={{ background: dept.color }} aria-hidden>
                                    {initials(emp.name)}
                                  </div>
                                  <div>
                                    <div className="emp-name">
                                      {emp.name} <span className="emp-id">({emp.id})</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>{emp.role}</td>
                              <td className="muted">{emp.email}</td>
                              <td>{c.total}</td>
                              {/* <td><span className="pill" style={{ background: STATUS_COLORS["Pending"] }}>{c.pending}</span></td> */}
                              <td><span className="pill" style={{ background: STATUS_COLORS["In Progress"] }}>{c.inProgress}</span></td>
                              <td><span className="pill" style={{ background: STATUS_COLORS["Completed"] }}>{c.completed}</span></td>
                              <td><span className="pill" style={{ background: STATUS_COLORS["Overdue"] }}>{c.overdue}</span></td>
                              <td><span className="pill" style={{ background: STATUS_COLORS["High Priority"] }}>{c.highPriority}</span></td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}

      {/* Staff detail modal */}
      {selectedStaff && (
        <div className="modal-overlay" onClick={() => setSelectedStaff(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              {selectedStaff.name} <span className="emp-id">({selectedStaff.id})</span>
            </h3>
            <p className="muted">
              {selectedStaff.role} — {selectedStaff.email} — Dept: {selectedStaff.department}
            </p>
            <div className="task-detail-table">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStaff.tasks.map((t, i) => (
                    <tr key={i}>
                      <td>{t.name || t.title}</td>
                      <td className="muted">{t.client || "—"}</td>
                      <td><span className="pill" style={{ background: STATUS_COLORS[normalizeStatus(t.status)] }}>{normalizeStatus(t.status)}</span></td>
                      <td>{t.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelectedStaff(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
