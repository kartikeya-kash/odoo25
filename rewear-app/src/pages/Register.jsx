import React from 'react';
import './Register.css';

const Register = () => (
  <div className="register-page">
    <form className="register-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit" className="register-btn">Register</button>
    </form>
  </div>
);

export default Register;
