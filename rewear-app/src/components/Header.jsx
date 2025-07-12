import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <nav className="header-nav">
    <div className="logo">
      <Link to="/">ReWear</Link>
    </div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/browse">Browse</Link></li>
      <li><Link to="/add-item">List an Item</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/admin">Admin</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Sign Up</Link></li>
    </ul>
  </nav>
);

export default Header;
