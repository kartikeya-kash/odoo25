import React from 'react';
import './ItemList.css';

const ItemList = () => (
  <div className="item-list-page">
    <div className="search-bar">
      <input type="text" placeholder="Search for items..." />
      <button>🔍</button>
    </div>
    <section className="categories-section">
      <h2>Categories</h2>
      <div className="categories-grid">[Categories grid]</div>
    </section>
    <section className="product-listings">
      <h2>Product Listings</h2>
      <div className="products-grid">[Product cards grid]</div>
    </section>
  </div>
);

export default ItemList;
