import React from 'react';
import './Landing.css';

const Landing = () => (
  <div className="landing-page">
    <section className="hero-section">
      <h1>Welcome to ReWear</h1>
      <p>Swap, redeem, and give your clothes a second life.</p>
      <div className="cta-buttons">
        <a href="/add-item" className="cta-btn">Start Swapping</a>
        <a href="/browse" className="cta-btn secondary">Browse Items</a>
      </div>
    </section>
    <section className="carousel-section">
      <h2>Featured Items</h2>
      <div className="carousel-placeholder">[Carousel of featured clothing items]</div>
    </section>
    <section className="categories-section">
      <h2>Categories</h2>
      <div className="categories-placeholder">[Categories grid]</div>
    </section>
  </div>
);

export default Landing;
