const pool = require('../config/db');

const createItem = async (item) => {
  const { title, description, category, type, size, condition, tags, status, uploader_id } = item;
  const [result] = await pool.execute(
    'INSERT INTO item (title, description, category, type, size, `condition`, tags, status, uploader_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, category, type, size, condition, tags, status || 'pending', uploader_id]
  );
  return result.insertId;
};

const getAllItems = async () => {
  const [rows] = await pool.execute('SELECT * FROM item');
  return rows;
};

const getItemById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM item WHERE id = ?', [id]);
  return rows[0];
};

const updateItem = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }
  values.push(id);
  const [result] = await pool.execute(
    `UPDATE item SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows;
};

const deleteItem = async (id) => {
  const [result] = await pool.execute('DELETE FROM item WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
