import React from 'react';
import './ItemDetail.css';

const ItemDetail = () => (
  <div className="item-detail-page">
    <div className="item-detail-container">
      <div className="item-image-placeholder">[Product Image]</div>
      <div className="item-info">
        <h2>Product Name</h2>
        <p className="item-description">[Product description goes here]</p>
        <div className="item-actions">
          <button className="swap-btn">Swap Request</button>
          <button className="redeem-btn">Redeem via Points</button>
        </div>
      </div>
    </div>
  </div>
);

export default ItemDetail;
