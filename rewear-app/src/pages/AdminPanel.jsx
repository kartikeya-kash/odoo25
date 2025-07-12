import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => (
  <div className="admin-panel-page">
    <div className="admin-tabs">
      <button>Manage Users</button>
      <button>Manage Orders</button>
      <button>Manage Listings</button>
    </div>
    <section className="manage-users-section">
      <h2>Manage Users</h2>
      <div className="users-list">[User management cards]</div>
    </section>
  </div>
);

export default AdminPanel;
