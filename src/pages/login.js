// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // default to user
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login: Just save role to localStorage
    localStorage.setItem('role', role);

    // Navigate to dashboard based on role
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login to Donut TaskManager</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Super Admin</option>
        </select><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
