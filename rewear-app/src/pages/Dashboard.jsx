import React from 'react';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard-page">
    <div className="profile-section">[User Profile Info]</div>
    <section className="my-listings-section">
      <h2>My Listings</h2>
      <div className="my-listings-grid">[User's listed items]</div>
    </section>
    <section className="my-purchases-section">
      <h2>My Purchases</h2>
      <div className="my-purchases-grid">[User's purchased items]</div>
    </section>
  </div>
);

export default Dashboard;
