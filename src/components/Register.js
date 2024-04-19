import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [usertype, setUsertype] = useState('customer');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== repassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Make API call to register user
      const response = await fetch('http://localhost:8000/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, repassword, usertype }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Registration successful, redirect to the login page
      window.location.href = '/Login';
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2 className="meta">Registration</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="repassword">Re-Password:</label>
          <input type="password" id="repassword" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="usertype">User Type:</label>
          <select id="usertype" value={usertype} onChange={(e) => setUsertype(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="agent">Insurance Agent</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default Register;
