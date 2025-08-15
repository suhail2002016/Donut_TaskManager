import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/navbar';
import Dashboard from './pages/Admin/dashboard_admin';
import Tasks from './pages/Admin/admin_tasks';
import Login from './pages/login'
import Departments from './pages/Admin/admin_dept';
 
function App() {
  return (
    <Router>
      <Routes>
<Route path="/" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="departments" element={<Departments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
