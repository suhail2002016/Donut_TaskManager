// // src/Login.js
// import React, { useState } from 'react';
// import '../Styles/login.css';

// const Login = () => {
//   const [role, setRole] = useState('superadmin');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     // Simulate navigation to dashboard
//     if (role === 'superadmin') {
//       window.location.href = '/admin/dashboard';
//     } else {
//       window.location.href = '/user/dashboard';
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="logo">🍩 Donut Tech</div>
//         <h2>Login to your Account</h2>

//         <div className="role-toggle">
//           <button
//             className={role === 'superadmin' ? 'active' : ''}
//             onClick={() => setRole('superadmin')}
//           >
//             Super Admin
//           </button>
//           <button
//             className={role === 'user' ? 'active' : ''}
//             onClick={() => setRole('user')}
//           >
//             User
//           </button>
//         </div>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email Id"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//           />

//           {error && <p className="error">{error}</p>}

//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <p className="forgot" tabIndex="0">I forgot my credentials</p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import '../Styles/login.css';
import characterImg from '../assets/3d-portrait-businessman.png';

function Login() {
    const [role, setRole] = useState('superadmin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter both email and password');
        } else {
            console.log("Selected role:", role); // Debug log

            if (role === 'superadmin') {
                window.location.href = '/admin/dashboard';
            } else {
                window.location.href = '/user/dashboard';
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="left-panel">
                <img src={characterImg} alt="Character" className="character-img" />
            </div>

            <div className="right-panel">
                <div className="login-box">
                    <div className="logo">🍩 Donut Task Manager</div>
                    <h2>Login to your Account</h2>

                    <div className="role-toggle">
                        <button
                            className={role === 'superadmin' ? 'active' : ''}
                            onClick={() => setRole('superadmin')}
                        >
                            Super Admin
                        </button>
                        <button
                            className={role === 'user' ? 'active' : ''}
                            onClick={() => setRole('user')}
                        >
                            User
                        </button>
                    </div>

                    <input
                        type="email"
                        className="input-field"
                        placeholder="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="error">{error}</div>}
                    <button className="login-btn" onClick={handleLogin}>
                        Login
                    </button>

                    <div className="forgot">I forgot my credentials</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
