// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import DashboardUser from './pages/dashboard_user'
import DashboardAdmin from './pages/dashboard_admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
