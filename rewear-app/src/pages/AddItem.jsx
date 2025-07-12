import React from 'react';
import './AddItem.css';

const AddItem = () => (
  <div className="add-item-page">
    <form className="add-item-form">
      <h2>Add New Item</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" id="type" name="type" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input type="text" id="size" name="size" required />
        </div>
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <input type="text" id="condition" name="condition" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input type="text" id="tags" name="tags" />
      </div>
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/*" />
      </div>
      <button type="submit" className="add-item-btn">Add Item</button>
    </form>
  </div>
);

export default AddItem;
